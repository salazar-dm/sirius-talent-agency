import React, {useContext, useEffect, useState} from "react";
import {PerformerProfileType} from "../../types/PerformerProfileType.tsx";
import {LocalUserType} from "../../types/LocalUserType.tsx";
import LoadingContext from "../../context/LoadingContext.tsx";
import {useImageHandler} from "../../hooks/useImageHandler.tsx";
import axios from "axios";
import {useNavigate, useNavigation, useParams} from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.tsx";
import ErrorModal from "../Modal/ErrorModal.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {createPortal} from "react-dom";
import Cropper from "react-easy-crop";
import Button from "../Button/Button.tsx";
import {FormSelect} from "../Form/FormSelect.tsx";
import DatePicker from "react-multi-date-picker";
import {calculateAge} from "../../shared/calculateAge.tsx";
import {formatInput, parseHeightToCm} from "../../shared/parseHeightToCm.tsx";
import {parseCmToHeight} from "../../shared/parseCmToHeight.tsx";
import {FormNumericInput} from "../Form/FormNumericInput.tsx";
import "./UpdateUserForm.css";

const UpdateUserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<PerformerProfileType | null>(null);
    const [user, setUser] = useState<LocalUserType | null>(null);
    const [originalPassword, setOriginalPassword] = useState<string | null>(null);

    const {loading, setLoading} = useContext(LoadingContext)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [errorModalMessage, setErrorModalMessage] = useState<string>('');
    const [successModal, setSuccessModal] = useState<boolean>(false);

    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [actraCardFile, setActraCardFile] = useState<File | null>(null);
    const [whasaFile, setWhasaFile] = useState<File | null>(null);

    const headshotHandler = useImageHandler(3/4);
    const [headshotSelected, setHeadshotSelected] = useState<boolean>(false);
    const fullBodyHandler = useImageHandler(3/4);
    const [fullBodySelected, setFullBodySelected] = useState<boolean>(false);

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [heightInput, setHeightInput] = useState<string>('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !id) return;

        const fetchUserById = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
                setProfile(res.data.profile);
                setOriginalPassword(res.data.password);

                console.log(res.data);
            } catch (err) {
                setErrorModal(true);
                setErrorModalMessage((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserById();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile || !user) return;

        setLoadingSubmit(true);
        setErrorMessage('');
        setSuccessMessage('');

        let uploadedHeadshotUrl = profile.keyName;
        let uploadedFullBodyUrl = profile.fullBodyKeyName;
        let uploadedDocumentUrl = profile.documentKeyName;
        let uploadedActraCardUrl = profile.actraCardKeyName;
        let uploadedWhasaUrl = profile.whasaKeyName;

        try {
            const upload = async (
                file: File | null,
                endpoint: string,
                setter: (url: string) => void
            ) => {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, formData, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setter(res.data);
                }
            };

            await upload(headshotHandler.croppedImageFile, '/api/cdn/upload-performer-profile-picture', (url) => uploadedHeadshotUrl = url);
            await upload(fullBodyHandler.croppedImageFile, '/api/cdn/upload-performer-fullbody-picture', (url) => uploadedFullBodyUrl = url);
            await upload(documentFile, '/api/cdn/upload-performer-document-picture', (url) => uploadedDocumentUrl = url);
            await upload(actraCardFile, '/api/cdn/upload-performer-actra-card-picture', (url) => uploadedActraCardUrl = url);
            await upload(whasaFile, '/api/cdn/upload-performer-whasa-picture', (url) => uploadedWhasaUrl = url);

            const userPayload = {
                ...user,
                performerProfile: {
                    ...profile,
                    keyName: uploadedHeadshotUrl,
                    fullBodyKeyName: uploadedFullBodyUrl,
                    documentKeyName: uploadedDocumentUrl,
                    actraCardKeyName: uploadedActraCardUrl,
                    whasaKeyName: uploadedWhasaUrl,
                }
            }

            delete userPayload.profile;

            console.log(userPayload)

            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${user.id}`, userPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Profile updated successfully!');
            setSuccessModal(true);
            setFormSubmitted(prev => !prev);
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to update profile.');
            setErrorModalMessage('Something went wrong during update.');
            setErrorModal(true);
        } finally {
            setLoadingSubmit(false);
        }
    };




    if (loading) {
        return <LoadingOverlay />;
    }

    if (!user) {
        return <ErrorModal title="Error" message="User not found" onClose={() => navigate("/admin")}/>;
    }

    return (
        <>
            {errorModal && <ErrorModal title="Missing required fields" message={errorModalMessage} onClose={() => setErrorModal(false)}/>}
            {successModal && <ErrorModal title="Profile updated" message={successMessage} onClose={() => navigate("/admin")}/>}
            {loadingSubmit && <LoadingOverlay />}
            <div className="UpdateProfile__content-wrapper fade-in">
                <div className="UpdateProfile__signpost">
                    <div className="Grid_grid__container Grid_grid__container__margin"
                         style={numberOfColumnsStyle(16)}>
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 2, 8, 2, 8)}>
                            <div className="Signpost__signpost-container">
                                <p className="Signpost__eyebrow">update</p>
                                <h3 className="Signpost__title">Update user account</h3>
                                <p className="Signpost__body">To activate your account, please complete your profile using the American measurement system (feet, inches, lbs).</p>
                            </div>
                        </div>
                        <div className="Grid_grid__item"
                             style={columnsStyle(1, 9, 1, 9, 9, 15, 9, 15)}>
                            <div className="UpdateForm__update-form-container">
                                {profile ? (
                                    <form onSubmit={handleSubmit}>
                                        <p>
                                            <label>Phone Number</label>
                                            <input
                                                type="text"
                                                value={user.tel}
                                                onChange={(e) => setUser({...user, tel: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                onChange={(e) => setUser({...user, email: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <label>Set New Password</label>
                                            <input
                                                type="text"
                                                value={user.password}
                                                onChange={(e) => setUser({...user, password: e.target.value})}
                                                placeholder="Leave blank to keep current"
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Email Verified"
                                                select={{
                                                    id: 'email-verified',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setUser({...user, emailVerified: value}),
                                                    defaultValue: user.emailVerified,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Test Passed"
                                                select={{
                                                    id: 'test-passed',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setUser({...user, testPassed: value}),
                                                    defaultValue: user.testPassed,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="User Activated"
                                                select={{
                                                    id: 'user-activated',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setUser({...user, userActivated: value}),
                                                    defaultValue: user.userActivated,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                value={profile.firstName}
                                                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <label>Middle Name</label>
                                            <input
                                                type="text"
                                                value={profile.middleName}
                                                onChange={(e) => setProfile({...profile, middleName: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                value={profile.lastName}
                                                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <label>Profile Picture</label>
                                            <input type="file" accept="image/*"
                                                   onChange={headshotHandler.onFileChange}/>
                                        </p>

                                        {headshotHandler.imageUrl && headshotHandler.showCrop &&
                                            createPortal(
                                                <div className="CropperPortalOverlay">
                                                    <Cropper
                                                        image={headshotHandler.imageUrl}
                                                        crop={headshotHandler.crop}
                                                        zoom={headshotHandler.zoom}
                                                        aspect={headshotHandler.aspectRatio}
                                                        onCropChange={headshotHandler.setCrop}
                                                        onZoomChange={headshotHandler.setZoom}
                                                        onCropComplete={headshotHandler.onCropComplete}
                                                    />

                                                    <Button
                                                        buttonStyle="secondaryTextOnClick"
                                                        buttonOnClick={() => headshotHandler.onCropDone(profile?.firstName + '-head')}
                                                        buttonText="Submit"
                                                        className="UpdateProfile__submit-button"
                                                    />
                                                </div>,
                                                document.body
                                            )
                                        }


                                        {headshotHandler.croppedImage && (
                                            <p>
                                                <img className="UpdateProfile__cropped-image-preview"
                                                     src={headshotHandler.croppedImage} alt="Headshot"/>
                                            </p>
                                        )}

                                        {profile.keyName != '' && !headshotHandler.croppedImage && (
                                            <p>
                                                <img className="UpdateProfile__cropped-image-preview"
                                                     src={profile.keyName}
                                                     alt="Headshot"/>
                                            </p>
                                        )}

                                        <p>
                                            <label>Full Body Picture</label>
                                            <input type="file" accept="image/*"
                                                   onChange={fullBodyHandler.onFileChange}/>
                                        </p>

                                        {fullBodyHandler.imageUrl && fullBodyHandler.showCrop && createPortal(
                                            <>
                                                <Cropper
                                                    image={fullBodyHandler.imageUrl}
                                                    crop={fullBodyHandler.crop}
                                                    zoom={fullBodyHandler.zoom}
                                                    aspect={fullBodyHandler.aspectRatio}
                                                    onCropChange={fullBodyHandler.setCrop}
                                                    onZoomChange={fullBodyHandler.setZoom}
                                                    onCropComplete={fullBodyHandler.onCropComplete}
                                                />
                                                <Button
                                                    buttonStyle="secondaryTextOnClick"
                                                    buttonOnClick={() => fullBodyHandler.onCropDone(profile?.firstName + '-body')}
                                                    buttonText="Submit"
                                                    className="UpdateProfile__submit-button"
                                                />
                                            </>,
                                            document.body
                                        )}


                                        {fullBodyHandler.croppedImage && (
                                            <p>
                                                <img className="UpdateProfile__cropped-image-preview"
                                                     src={fullBodyHandler.croppedImage} alt="Full Body"/>
                                            </p>
                                        )}

                                        {profile.fullBodyKeyName != '' && !fullBodyHandler.croppedImage && (
                                            <p>
                                                <img className="UpdateProfile__cropped-image-preview"
                                                     src={profile.fullBodyKeyName} alt="Full Body"/>
                                            </p>
                                        )}

                                        {(
                                            <p>
                                                <FormSelect
                                                    label="Union Status"
                                                    select={{
                                                        id: 'union-status',
                                                        required: true,
                                                        options: [
                                                            {label: 'Non-Union', value: 'Non-Union'},
                                                            {label: 'AABP', value: 'AABP'},
                                                            {label: 'ACTRA Apprentice', value: 'ACTRA Apprentice'},
                                                            {label: 'ACTRA Full', value: 'ACTRA Full'},
                                                        ],
                                                        onChange: (value) => setProfile({
                                                            ...profile,
                                                            unionStatus: value
                                                        }),
                                                        defaultValue: profile.unionStatus,
                                                    }}
                                                />
                                            </p>
                                        )}


                                        {(profile.unionStatus === 'AABP' || profile.unionStatus === 'ACTRA Full' || 'ACTRA Apprentice') && (
                                            <p>
                                                <label>Union ID</label>
                                                <input
                                                    type="text"
                                                    value={profile.unionId}
                                                    onChange={(e) => setProfile({...profile, unionId: e.target.value})}
                                                />
                                            </p>
                                        )}

                                        {(profile.unionStatus === 'ACTRA Full' || profile.unionStatus === 'ACTRA Apprentice') && (
                                            <p>
                                                <label>Picture of ACTRA Card or ACTRA status email confirmation</label>
                                                <input type="file" accept="image/*" onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setActraCardFile(file);
                                                    }
                                                }}/>
                                            </p>
                                        )}

                                        {(
                                            <p>
                                                <label>Date of Birth</label>
                                                <DatePicker
                                                    value={profile.dateOfBirth ? new Date(profile.dateOfBirth) : null}
                                                    onChange={(e) => {
                                                        if (e) {
                                                            const dateString = e.toDate().toISOString();
                                                            setProfile({...profile, dateOfBirth: dateString});
                                                        }
                                                    }}
                                                    className={`green`}
                                                />
                                            </p>
                                        )}

                                        {profile.dateOfBirth && calculateAge(profile.dateOfBirth) < 18 && (
                                            <>
                                                <p>
                                                    <label>Legal Guardian's Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={profile.guardianFullName}
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                guardianFullName: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </p>
                                                <p>
                                                    <label>Legal Guardian's Phone Number</label>
                                                    <input
                                                        type="text"
                                                        value={profile.guardianTel}
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                guardianTel: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </p>
                                            </>
                                        )}


                                        {profile.dateOfBirth && calculateAge(profile.dateOfBirth) > 17 && (
                                            <p>
                                                <label>Picture of document (OHIP, Driver's License, etc.)</label>
                                                <input type="file" accept="image/*" onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setDocumentFile(file);
                                                    }
                                                }}/>
                                            </p>
                                        )}


                                        <p>
                                            <label>SIN</label>
                                            <input
                                                type="text"
                                                value={profile.socialInsuranceNumber}
                                                onChange={(e) => setProfile({
                                                    ...profile,
                                                    socialInsuranceNumber: e.target.value
                                                })}
                                            />
                                        </p>

                                        <p>
                                            <label>Emergency Contact Name</label>
                                            <input
                                                type="text"
                                                value={profile.emergencyFullName}
                                                onChange={(e) => setProfile({
                                                    ...profile,
                                                    emergencyFullName: e.target.value
                                                })}
                                            />
                                        </p>

                                        <p>
                                            <label>Emergency Contact Phone Number</label>
                                            <input
                                                type="text"
                                                value={profile.emergencyTel}
                                                onChange={(e) => setProfile({...profile, emergencyTel: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <label>City</label>
                                            <input
                                                type="text"
                                                value={profile.city}
                                                onChange={(e) => setProfile({...profile, city: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Province"
                                                select={{
                                                    id: 'province',
                                                    required: true,
                                                    options: [
                                                        {label: 'Alberta', value: 'AB'},
                                                        {label: 'British Columbia', value: 'BC'},
                                                        {label: 'Manitoba', value: 'MB'},
                                                        {label: 'New Brunswick', value: 'NB'},
                                                        {label: 'Newfoundland and Labrador', value: 'NL'},
                                                        {label: 'Northwest Territories', value: 'NT'},
                                                        {label: 'Nova Scotia', value: 'NS'},
                                                        {label: 'Nunavut', value: 'NU'},
                                                        {label: 'Ontario', value: 'ON'},
                                                        {label: 'Prince Edward Island', value: 'PE'},
                                                        {label: 'Quebec', value: 'QC'},
                                                        {label: 'Saskatchewan', value: 'SK'},
                                                        {label: 'Yukon', value: 'YT'},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, state: value}),
                                                    defaultValue: profile.state,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <label>Postal Code</label>
                                            <input
                                                type="text"
                                                value={profile.postalCode}
                                                onChange={(e) => setProfile({...profile, postalCode: e.target.value})}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Self-Drive"
                                                select={{
                                                    id: 'self-drive',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, selfDrive: value}),
                                                    defaultValue: profile.selfDrive,
                                                }}
                                            />
                                        </p>

                                        {(
                                            <p>
                                                <label>Picture of Worker Health and Safety Awareness certificate</label>
                                                <input type="file" accept="image/*" onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setWhasaFile(file);
                                                    }
                                                }}/>
                                            </p>
                                        )}

                                        <p>
                                            <FormSelect
                                                label="Gender"
                                                select={{
                                                    id: 'gender',
                                                    required: true,
                                                    options: [
                                                        {label: 'Male', value: 'male'},
                                                        {label: 'Female', value: 'female'},
                                                        {label: 'Non-Binary (Male Sizes)', value: 'non-binary-male'},
                                                        {
                                                            label: 'Non-Binary (Female Sizes)',
                                                            value: 'non-binary-female'
                                                        },
                                                    ],
                                                    onChange: (value) => setProfile({...profile, gender: value}),
                                                    defaultValue: profile.gender,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Ethnicity"
                                                select={{
                                                    id: 'ethnicity',
                                                    required: true,
                                                    options: [
                                                        {label: 'White', value: 'white'},
                                                        {label: 'Black', value: 'black'},
                                                        {label: 'Caucasian', value: 'caucasian'},
                                                        {label: 'East Asian', value: 'east-asian'},
                                                        {label: 'South Asian', value: 'south-asian'},
                                                        {label: 'Southeast Asian', value: 'southeast-asian'},
                                                        {label: 'Indigenous', value: 'indigenous'},
                                                        {label: 'Latino / Hispanic', value: 'latino'},
                                                        {label: 'Middle Eastern / North African', value: 'mena'},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, ethnicity: value}),
                                                    defaultValue: profile.ethnicity,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="LGBTQ+"
                                                select={{
                                                    id: 'lgbtq',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, lgbt: value}),
                                                    defaultValue: profile.lgbt,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="BIPOC"
                                                select={{
                                                    id: 'bipoc',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, bipoc: value}),
                                                    defaultValue: profile.bipoc,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Transgender"
                                                select={{
                                                    id: 'transgender',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, trans: value}),
                                                    defaultValue: profile.trans,
                                                }}
                                            />
                                        </p>


                                        <p>
                                            <FormSelect
                                                label="Visible Tattoos"
                                                select={{
                                                    id: 'visible-tattoos',
                                                    required: true,
                                                    options: [
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ],
                                                    onChange: (value) => setProfile({
                                                        ...profile,
                                                        visibleTattoos: value
                                                    }),
                                                    defaultValue: profile.visibleTattoos,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Hair Color"
                                                select={{
                                                    id: 'hair-color',
                                                    required: true,
                                                    options: [
                                                        {label: 'Afro / Braids', value: 'afro'},
                                                        {label: 'Black', value: 'black'},
                                                        {label: 'Dark Brown', value: 'dark-brown'},
                                                        {label: 'Light Brown', value: 'light-brown'},
                                                        {label: 'Dark Blonde', value: 'dark-blonde'},
                                                        {label: 'Light Blonde', value: 'light-blonde'},
                                                        {label: 'Red / Auburn', value: 'red'},
                                                        {label: 'Grey / White', value: 'grey'},
                                                        {label: 'Bald / Shaved', value: 'bald'},
                                                        {label: 'Dyed / Unnatural Color', value: 'dyed'},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, hairColor: value}),
                                                    defaultValue: profile.hairColor,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormSelect
                                                label="Eye Color"
                                                select={{
                                                    id: 'eye-color',
                                                    required: true,
                                                    options: [
                                                        {label: 'Brown', value: 'brown'},
                                                        {label: 'Hazel', value: 'hazel'},
                                                        {label: 'Amber', value: 'amber'},
                                                        {label: 'Green', value: 'green'},
                                                        {label: 'Blue', value: 'blue'},
                                                        {label: 'Grey', value: 'grey'},
                                                        {label: 'Other / Mixed', value: 'other'},
                                                    ],
                                                    onChange: (value) => setProfile({...profile, eyeColor: value}),
                                                    defaultValue: profile.eyeColor,
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <label>Height</label>
                                            <input
                                                type="text"
                                                value={heightInput}
                                                onChange={(e) => {
                                                    const formatted = formatInput(e.target.value);
                                                    setHeightInput(formatted);

                                                    const cm = parseHeightToCm(formatted);
                                                    if (cm !== null) {
                                                        setProfile({...profile, sizeHeight: cm});
                                                    }
                                                }}
                                                defaultValue={parseCmToHeight(profile.sizeHeight)}
                                            />
                                        </p>

                                        <p>
                                            <FormNumericInput
                                                label="Weight"
                                                input={{
                                                    id: "size-weight",
                                                    required: true,
                                                    defaultValue: profile.sizeWeight,
                                                    onChange: (value) =>
                                                        setProfile({...profile, sizeWeight: value}),
                                                }}
                                            />
                                        </p>

                                        <p>
                                            <FormNumericInput
                                                label="Chest Size"
                                                input={{
                                                    id: "chest",
                                                    required: true,
                                                    defaultValue: profile.sizeChest,
                                                    onChange: (val) => setProfile({...profile, sizeChest: val}),
                                                }}
                                            />
                                        </p>

                                        {(profile.gender === 'male' || profile.gender === 'non-binary-male') && (
                                            <>
                                                <p>
                                                    <FormSelect
                                                        label="Jacket Size"
                                                        select={{
                                                            id: 'size-jacket',
                                                            required: true,
                                                            options: [
                                                                {label: 'Short', value: 'short'},
                                                                {label: 'Regular', value: 'regular'},
                                                                {label: 'Tall', value: 'tall'},
                                                            ],
                                                            onChange: (value) => setProfile({
                                                                ...profile,
                                                                sizeJacket: value
                                                            }),
                                                            defaultValue: profile.sizeJacket,
                                                        }}
                                                    />
                                                </p>
                                                <p>
                                                    <FormNumericInput
                                                        label="Sleeve"
                                                        input={{
                                                            id: "size-sleeve",
                                                            required: true,
                                                            defaultValue: profile.sizeSleeve,
                                                            onChange: (value) =>
                                                                setProfile({...profile, sizeSleeve: value}),
                                                        }}
                                                        triggerSubmit={formSubmitted}
                                                    />
                                                </p>

                                                <p>
                                                    <FormNumericInput
                                                        label="Neck"
                                                        input={{
                                                            id: "size-neck",
                                                            required: true,
                                                            defaultValue: profile.sizeNeck,
                                                            onChange: (value) =>
                                                                setProfile({...profile, sizeNeck: value}),
                                                        }}
                                                        triggerSubmit={formSubmitted}
                                                    />
                                                </p>

                                                <p>
                                                    <FormNumericInput
                                                        label="Hat"
                                                        input={{
                                                            id: "size-hat",
                                                            required: true,
                                                            defaultValue: profile.sizeHat,
                                                            onChange: (value) =>
                                                                setProfile({...profile, sizeHat: value}),
                                                        }}
                                                        triggerSubmit={formSubmitted}
                                                    />
                                                </p>
                                            </>
                                        )}

                                        {(profile.gender === 'female' || profile.gender === 'non-binary-female') && (
                                            <>
                                                <p>
                                                    <FormSelect
                                                        label="Dress Size"
                                                        select={{
                                                            id: 'size-dress',
                                                            required: true,
                                                            options: [
                                                                {label: '0-2', value: '0-2'},
                                                                {label: '2-4', value: '2-4'},
                                                                {label: '4-6', value: '4-6'},
                                                                {label: '6-8', value: '6-8'},
                                                                {label: '8-10', value: '8-10'},
                                                                {label: '10-12', value: '10-12'},
                                                                {label: '12-14', value: '12-14'},
                                                            ],
                                                            onChange: (value) =>
                                                                setProfile({...profile, sizeDress: value}),
                                                            defaultValue: profile.sizeDress,
                                                        }}
                                                    />
                                                </p>

                                                <p>
                                                    <FormSelect
                                                        label="Bust Cup Size"
                                                        select={{
                                                            id: 'size-bust-cup',
                                                            required: true,
                                                            options: [
                                                                {label: 'AA', value: 'AA'},
                                                                {label: 'A', value: 'A'},
                                                                {label: 'B', value: 'B'},
                                                                {label: 'C', value: 'C'},
                                                                {label: 'D', value: 'D'},
                                                                {label: 'DD/E', value: 'DD/E'},
                                                                {label: 'DDD/F', value: 'DDD/F'},
                                                            ],
                                                            onChange: (value) =>
                                                                setProfile({...profile, sizeBustCup: value}),
                                                            defaultValue: profile.sizeBustCup,
                                                        }}
                                                    />
                                                </p>

                                                <p>
                                                    <FormNumericInput
                                                        label="Bra Size"
                                                        input={{
                                                            id: "size-bust-band",
                                                            required: true,
                                                            defaultValue: profile.sizeBustBand,
                                                            onChange: (value) =>
                                                                setProfile({...profile, sizeBustBand: value}),
                                                        }}
                                                        triggerSubmit={formSubmitted}
                                                    />
                                                </p>

                                            </>
                                        )}

                                        <p>
                                            <FormNumericInput
                                                label="Waist"
                                                input={{
                                                    id: "size-waist",
                                                    required: true,
                                                    defaultValue: profile.sizeWaist,
                                                    onChange: (value) =>
                                                        setProfile({...profile, sizeWaist: value}),
                                                }}
                                                triggerSubmit={formSubmitted}
                                            />
                                        </p>

                                        <p>
                                            <FormNumericInput
                                                label="Hips"
                                                input={{
                                                    id: "size-hips",
                                                    required: true,
                                                    defaultValue: profile.sizeHips,
                                                    onChange: (value) =>
                                                        setProfile({...profile, sizeHips: value}),
                                                }}
                                                triggerSubmit={formSubmitted}
                                            />
                                        </p>

                                        <p>
                                            <FormNumericInput
                                                label="Shoe Size"
                                                input={{
                                                    id: "size-shoe",
                                                    required: true,
                                                    defaultValue: profile.sizeShoe,
                                                    onChange: (value) =>
                                                        setProfile({...profile, sizeShoe: value}),
                                                }}
                                                triggerSubmit={formSubmitted}
                                            />
                                        </p>


                                        <p>
                                            <FormNumericInput
                                                label="Inseam"
                                                input={{
                                                    id: "size-inseam",
                                                    required: true,
                                                    defaultValue: profile.sizeInseam,
                                                    onChange: (value) =>
                                                        setProfile({...profile, sizeInseam: value}),
                                                }}
                                                triggerSubmit={formSubmitted}
                                            />
                                        </p>

                                        <Button buttonStyle="submit" buttonText="Submit"/>
                                    </form>
                                ) : (
                                    <LoadingOverlay/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateUserForm;
