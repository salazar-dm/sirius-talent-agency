import React, {ChangeEvent} from "react";
import {useState, useEffect} from "react";
import "./ActivationForm.css"
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {useNavigate} from "react-router-dom";

const ActivationForm: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [unionStatus, setUnionStatus] = useState<string>('');
    const [unionId, setUnionId] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [socialInsuranceNumber, setSocialInsuranceNumber] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [selfDrive, setSelfDrive] = useState<boolean>(false);
    const [selfDriveString, setSelfDriveString] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [ethnicity, setEthnicity] = useState<string>('');
    const [hairColor, setHairColor] = useState<string>('');
    const [eyeColor, setEyeColor] = useState<string>('');
    const [sizeHeight, setSizeHeight] = useState<number>(0);
    const [sizeHeightString, setSizeHeightString] = useState<string>('');
    const [sizeWeight, setSizeWeight] = useState<number>(0);
    const [sizeWeightString, setSizeWeightString] = useState<string>('');
    const [sizeChest, setSizeChest] = useState<number>(0);
    const [sizeChestString, setSizeChestString] = useState<string>('');
    const [sizeWaist, setSizeWaist] = useState<number>(0);
    const [sizeWaistString, setSizeWaistString] = useState<string>('');
    const [sizeHips, setSizeHips] = useState<number>(0);
    const [sizeHipsString, setSizeHipsString] = useState<string>('');
    const [sizeShoe, setSizeShoe] = useState<number>(0);
    const [sizeShoeString, setSizeShoeString] = useState<string>('');
    const [sizeInseam, setSizeInseam] = useState<number>(0);
    const [sizeInseamString, setSizeInseamString] = useState<string>('');
    const [sizeSleeve, setSizeSleeve] = useState<number>(0);
    const [sizeSleeveString, setSizeSleeveString] = useState<string>('');
    const [sizeNeck, setSizeNeck] = useState<number>(0);
    const [sizeNeckString, setSizeNeckString] = useState<string>('');
    const [sizeHat, setSizeHat] = useState<number>(0);
    const [sizeHatString, setSizeHatString] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const formatHeight = (value: string): string => {
        let input = value.replace(/[^0-9']/g, '');
        switch (input.length) {
            case 0:
                return `${input}`;
            case 1:
                return `${input[0]}`;
            case 2:
                if (input[1] === "'") {
                return `${input[0]}${input[1]}`;
                } else {
                return `${input[0]}'${input[1]}`;
                }
            default:
                if (input[1] === "'") {
                return `${input[0]}${input[1]}${input[2]}`;
                } else {
                return `${input[0]}'${input[1]}`;
                }
        }
    };

    const formatSocialInsuranceNumber = (value: string): string => {
        let input = value.replace(/\D/g, '');

        switch (input.length) {
            case 0:
                return '';
            case 1:
            case 2:
            case 3:
                return input;
            case 4:
            case 5:
            case 6:
                return `${input.slice(0, 3)}-${input.slice(3)}`;
            case 7:
            case 8:
            case 9:
                return `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6)}`;
            default:
                return `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 9)}`;
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSelfDriveChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        switch (value) {
            case '':
            {
                setSelfDrive(false);
                setSelfDriveString('');
                break;
            } case 'Yes':
            {
                setSelfDrive(true);
                setSelfDriveString('Yes');
                break;
            } case 'No':
            {
                setSelfDrive(false);
                setSelfDriveString('No');
                break;
            }

        }
    };

    const handleSocialInsuranceNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSocialInsuranceNumber(formatSocialInsuranceNumber(value));
    };

    const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeHeightString(formatHeight(value));

        const convertedHeight = convertToInches(formatHeight(value));
        if (convertedHeight) {
            setSizeHeight(convertedHeight);
        }
    };

    const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeWeightString(value);
        setSizeWeight(Number(value));
    };

    const handleChestChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeChestString(value);
        setSizeChest(Number(value));
    };

    const handleWaistChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeWaistString(value);
        setSizeWaist(Number(value));
    };

    const handleHipsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeHipsString(value);
        setSizeHips(Number(value));
    };

    const handleShoeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeShoeString(value);
        setSizeShoe(Number(value));
    };

    const handleInseamChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeInseamString(value);
        setSizeInseam(Number(value));
    };

    const handleSleeveChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeSleeveString(value);
        setSizeSleeve(Number(value));
    };

    const handleNeckChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeNeckString(value);
        setSizeNeck(Number(value));
    };

    const handleHatChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSizeHatString(value);
        setSizeHat(Number(value));
    };

    const convertToInches = (height: string | null) => {
        const regex = /^(\d+)'(\d+)$/; // Regular expression to match format "X'Y"

        if (!height) {
            throw new Error('Height is required');
        }
        const match = height.match(regex);

        if (match) {
            const feet = parseInt(match[1], 10);
            const inches = parseInt(match[2], 10);

            return (feet * 12) + inches;
        } else {
            return null; // Return null or handle error if the format is incorrect
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        console.log({sizeHeight, sizeWeight, sizeShoe, sizeInseam, sizeSleeve, sizeNeck, sizeHat, sizeChest, sizeWaist, sizeHips});

        const activationBody = {
            firstName,
            lastName,
            unionStatus,
            unionId,
            dateOfBirth,
            socialInsuranceNumber,
            city,
            state,
            postalCode,
            country,
            selfDrive,
            gender,
            ethnicity,
            hairColor,
            eyeColor,
            sizeHeight,
            sizeWeight,
            sizeChest,
            sizeWaist,
            sizeHips,
            sizeShoe,
            sizeInseam,
            sizeSleeve,
            sizeNeck,
            sizeHat,
        };

        try {
            const response = await fetch('https://sirius-talent-agency.onrender.com/profile/activate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(activationBody),
            });

            navigate("/auth/me", { replace: true });

            const result = await response.json();

            if (response.ok) {
                console.log('Activation successful:', result);
                setError(null);
            } else {
                console.error('Activation failed:', result.failureReason);
                setError(result.failureReason || 'Login failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="ActivationForm__wrapper">
                <div className="Grid_grid__container LoginForm__grid"
                     style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item ActivationForm__item"
                         style={columnsStyle(1, 9, 1, 9, 1, 18, 1, 18)}>
                        <div className="ActivationForm__container">
                            <form onSubmit={handleSubmit}>
                                <div className="ActivationForm__input ActivationForm__input-first-name">
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-last-name">
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-union-status ActivationForm__select-input">
                                    <select value={unionStatus}
                                            onChange={(e) => setUnionStatus(e.target.value)}
                                            required>
                                        <option value="" disabled selected>Union Status</option>
                                        <option value="Non-Union">Non-Union</option>
                                        <option value="AABP">AABP</option>
                                        <option value="ACTRA Apprentice">ACTRA Apprentice</option>
                                        <option value="ACTRA Full">ACTRA Full</option>
                                    </select>
                                </div>

                                {unionStatus!=="Non-Union" && unionStatus!=="" && (
                                <div className="ActivationForm__input ActivationForm__input-union-id">
                                    <input
                                        type="text"
                                        value={unionId || ''}
                                        onChange={(e) => setUnionId(e.target.value || null)}
                                        placeholder="Union ID"
                                    />
                                </div>
                                )}

                                <div className="ActivationForm__input ActivationForm__input-date-of-birth">
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        placeholder="Date of Birth"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-social-insurance-number">
                                    <input
                                        type="text"
                                        value={socialInsuranceNumber}
                                        onChange={(e) => handleSocialInsuranceNumberChange(e)}
                                        placeholder="Social Insurance Number"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-city">
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="City"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-state">
                                    <input
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        placeholder="Province"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-postal-code">
                                    <input
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        placeholder="Postal Code"
                                        required
                                    />
                                </div>

                                {/*<div
                                    className="ActivationForm__input ActivationForm__input-country ActivationForm__select-input">
                                    <select value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required>
                                        <option value="" disabled selected>Country</option>
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>*/}

                                <div
                                    className="ActivationForm__input ActivationForm__input-gender ActivationForm__select-input">
                                    <select value={selfDriveString}
                                            onChange={(e) => handleSelfDriveChange(e)}
                                            required>
                                        <option value="" disabled selected>Self-drive outside of GTA</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div
                                    className="ActivationForm__input ActivationForm__input-gender ActivationForm__select-input">
                                    <select value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required>
                                        <option value="" disabled selected>Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-Binary">Non-Binary</option>
                                    </select>
                                </div>

                                <div
                                    className="ActivationForm__input ActivationForm__input-ethnicity ActivationForm__select-input">
                                    <select value={ethnicity}
                                            onChange={(e) => setEthnicity(e.target.value)}
                                            required>
                                        <option value="" disabled selected>Ethnicity</option>
                                        <option value="Caucasian">Caucasian</option>
                                        <option value="Black">Black</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Latino">Latino</option>
                                        <option value="Middle Eastern">Middle Eastern</option>
                                        <option value="First Nations">First Nations</option>
                                        <option value="Indian-South Asian">Indian-South Asian</option>
                                    </select>
                                </div>

                                <div
                                    className="ActivationForm__input ActivationForm__input-hair-color ActivationForm__select-input">
                                    <select value={hairColor}
                                            onChange={(e) => setHairColor(e.target.value)}
                                            required>
                                        <option value="" disabled selected>Hair Color</option>
                                        <option value="Bald">Bald</option>
                                        <option value="Black">Black</option>
                                        <option value="Light Brown">Light Brown</option>
                                        <option value="Dark Brown">Dark Brown</option>
                                        <option value="Light Blonde">Light Blonde</option>
                                        <option value="Dark Blonde">Light Blonde</option>
                                        <option value="Grey">Grey</option>
                                        <option value="White">White</option>
                                        <option value="Ginger">Red</option>
                                    </select>
                                </div>

                                <div
                                    className="ActivationForm__input ActivationForm__input-eye-color ActivationForm__select-input">
                                    <select value={eyeColor}
                                            onChange={(e) => setEyeColor(e.target.value)}
                                            required>
                                        <option value="" disabled selected>Eye Color</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Brown">Brown</option>
                                        <option value="Green">Green</option>
                                        <option value="Grey">Grey</option>
                                        <option value="Hazel">Hazel</option>
                                        <option value="Black">Black</option>
                                    </select>
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-height">
                                    <input
                                        type="text"
                                        value={sizeHeightString}
                                        onChange={(e) => handleHeightChange(e)}
                                        placeholder="Height (US Standard)"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-weight">
                                    <input
                                        type="text"
                                        value={sizeWeightString}
                                        onChange={(e) => handleWeightChange(e)}
                                        placeholder="Weight (Lbs)"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-chest">
                                    <input
                                        type="text"
                                        value={sizeChestString}
                                        onChange={(e) => handleChestChange(e)}
                                        placeholder="Chest"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-waist">
                                    <input
                                        type="type"
                                        value={sizeWaistString}
                                        onChange={(e) => handleWaistChange(e)}
                                        placeholder="Waist"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-hips">
                                    <input
                                        type="text"
                                        value={sizeHipsString}
                                        onChange={(e) => handleHipsChange(e)}
                                        placeholder="Hips"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-shoe">
                                    <input
                                        type="text"
                                        value={sizeShoeString}
                                        onChange={(e) => handleShoeChange(e)}
                                        placeholder="Shoe Size (US Standard)"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-inseam">
                                    <input
                                        type="text"
                                        value={sizeInseamString}
                                        onChange={(e) => handleInseamChange(e)}
                                        placeholder="Inseam"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-sleeve">
                                    <input
                                        type="text"
                                        value={sizeSleeveString}
                                        onChange={(e) => handleSleeveChange(e)}
                                        placeholder="Sleeve Length"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-neck">
                                    <input
                                        type="text"
                                        value={sizeNeckString}
                                        onChange={(e) => handleNeckChange(e)}
                                        placeholder="Neck"
                                        required
                                    />
                                </div>

                                <div className="ActivationForm__input ActivationForm__input-size-hat">
                                    <input
                                        type="text"
                                        value={sizeHatString}
                                        onChange={(e) => handleHatChange(e)}
                                        placeholder="Hat Size"
                                        required
                                    />
                                </div>
                                <button className="PrimaryButton_button" type="submit" disabled={loading}>
                                    <span className="PrimaryButton_text">Submit</span>
                                    <span className="PrimaryButton_icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                         fill="none">
                                        <g clipPath="url(#clip0_840_451)">
                                            <path d="M20 10L15 15L15 5L20 10Z" fill="currentColor"></path>
                                            <path d="M0 10L17 10" stroke="currentColor" strokeWidth="2"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_840_451">
                                                <rect width="20" height="20" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                </button>
                                {
                                    error && <p style={{color: 'red'}}>{error}</p>
                                }
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default ActivationForm;