import React, {useEffect, useState} from "react";
import "./SendAvailabilityCheckFilters.css";
import axios from "axios";
import { LocalUserType } from "../../types/LocalUserType.tsx";
import PrimaryButton from "../Button/PrimaryButton.tsx";
import {filtersTemplate} from "../../templates/sendAvailabilityCheckFiltersTemplate.ts";
import {normalizeCamelCase} from "../../shared/normalizeCamelCase.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import SecondaryButton from "../Button/SecondaryButton.tsx";

const allFilterKeys = Object.entries(filtersTemplate).map(([key, config]) => ({
    key,
    type: config.type === 'range' ? 'range' : 'preset'
}));

interface SendAvailabilityCheckFiltersProps {
    roleName: string;
    onSave: (performerIds: string[]) => void;
}


export const SendAvailabilityCheckFilters: React.FC<SendAvailabilityCheckFiltersProps> = ({ roleName, onSave }) => {
    const [filtered, setFiltered] = useState<LocalUserType[]>([]);
    const [filters, setFilters] = useState<
        { key: string; type: "preset" | "range"; value: any }[]
    >([]);

    const unusedFilters = allFilterKeys.filter(
        f => !filters.find(added => added.key === f.key)
    );

    const handleAddFilter = (key: string, type: "preset" | "range") => {
        setFilters(prev => [...prev, { key, type, value: type === "range" ? { min: "", max: "" } : [] }]);
    };

    const buildParams = () => {
        const params: Record<string, any> = {};
        filters.forEach(f => {
            if (f.type === "range") {
                if (f.value.min) params[`${f.key}Min`] = f.value.min;
                if (f.value.max) params[`${f.key}Max`] = f.value.max;
            } else {
                if (f.value.length > 0) {
                    params[f.key] = f.value[0]; // берем только один, расширишь потом
                }
            }
        });
        return params;
    };

    const handleFetch = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/performers/filter`, {
                params: buildParams(),
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Filtered performers:", response.data);
            setFiltered(response.data);
        } catch (err) {
            console.error("Failed to fetch filtered performers:", err);
        }
    };


    useEffect(() => {
        setFilters([]);
        setFiltered([]);
    }, [roleName]);


    return (
        <div className="SendAvailabilityCheckFilters__container">
            <div className="Grid_grid__container Grid_grid__container__margin">
                <div className="Grid_grid__item" style={columnsStyle(1, 9, 1, 9, 2, 16, 2, 16)}>
                    <h3>Selecting for role: {roleName}</h3>

            <div>
                <select onChange={e => {
                    const selected = allFilterKeys.find(f => f.key === e.target.value);
                    if (selected) handleAddFilter(selected.key, selected.type as "preset" | "range");
                }}>
                    <option value="">Add filter...</option>
                    {unusedFilters.map(f => (
                        <option key={f.key} value={f.key}>{normalizeCamelCase(f.key)}</option>
                    ))}
                </select>
            </div>

            {filters.map(f =>
                f.type === "range" ? (
                    <div key={f.key} className="SendAvailabilityCheckFilters__item">
                        <h3>{normalizeCamelCase(f.key)}</h3>
                        <div className="SendAvailabilityCheckFilters__inputs">
                            <input
                                type="number"
                                placeholder="min"
                                value={f.value.min}
                                onChange={e =>
                                    setFilters(prev =>
                                        prev.map(x =>
                                            x.key === f.key ? { ...x, value: { ...x.value, min: e.target.value } } : x
                                        )
                                    )
                                }
                            />
                            <input
                                type="number"
                                placeholder="max"
                                value={f.value.max}
                                onChange={e =>
                                    setFilters(prev =>
                                        prev.map(x =>
                                            x.key === f.key ? { ...x, value: { ...x.value, max: e.target.value } } : x
                                        )
                                    )
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div key={f.key} className="SendAvailabilityCheckFilters__item">
                        <h3>{normalizeCamelCase(f.key)}</h3>
                        <select
                            className={"SendAvailabilityCheckFilters__select"}
                            value={f.value}
                            onChange={e =>
                                setFilters(prev =>
                                    prev.map(x =>
                                        x.key === f.key ? { ...x, value: e.target.value } : x
                                    )
                                )
                            }
                        >
                            {(() => {
                                const template = filtersTemplate[f.key as keyof typeof filtersTemplate];

                                if (template.type === "enum") {
                                    return template.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ));
                                }

                                if (template.type === "boolean") {
                                    return (
                                        <>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </>
                                    );
                                }

                                return null;
                            })()}
                        </select>
                    </div>

                )
            )}


            <PrimaryButton text="Apply filters" onClick={handleFetch} />
                    {filtered.length > 0 && (
                        <>
                            <h3>{filtered.length} users found</h3>
                            <SecondaryButton text="Save" onClick={() => onSave(filtered.map(p => p.id))} />
                        </>

                    )
                    }
        </div>
            </div>
        </div>
    );
};
