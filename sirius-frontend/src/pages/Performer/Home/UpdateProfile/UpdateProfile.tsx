import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {columnsStyle} from "../../../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../../../shared/numberOfColumnsStyle.tsx";
import Cropper, {Area} from "react-easy-crop";
import Button from "../../../../components/Button/Button.tsx";
import "./UpdateProfile.css";
import DatePicker, {DateObject} from "react-multi-date-picker";
import "../../../../App.css";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay.tsx";
import ScrollNavigation from "../../../../templates/ScrollNavigation/ScrollNavigation.tsx";
import {FormSelect} from "../../../../components/Form/FormSelect.tsx";
import {formatInput, parseHeightToCm} from "../../../../shared/parseHeightToCm.tsx";
import {useImageHandler} from "../../../../hooks/useImageHandler.tsx";
import {parseCmToHeight} from "../../../../shared/parseCmToHeight.tsx";
import {getMissingRequiredFields, hasMissingRequiredFields} from "./hasMissingRequiredFields.tsx";
import ErrorModal from "../../../../components/Modal/ErrorModal.tsx";
import {FormNumericInput} from "../../../../components/Form/FormNumericInput.tsx";

export interface PerformerProfile {
    firstName: string;
    lastName: string;
    unionStatus: string;
    unionId: string;
    dateOfBirth: string;
    socialInsuranceNumber: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    selfDrive: boolean;
    gender: string;
    ethnicity: string;
    hairColor: string;
    eyeColor: string;
    sizeHeight: number;
    sizeWeight: number;
    sizeChest: number;
    sizeWaist: number;
    sizeHips: number;
    sizeShoe: number;
    sizeInseam: number;
    sizeSleeve: number;
    sizeNeck: number;
    sizeHat: number;
    sizeJacket: string;
    sizeBustCup: string;
    sizeBustBand: number;
    sizeDress: string;
    keyName: string;
    fullBodyKeyName: string;
}

const UpdateProfile: React.FC = () => {
    const [profile, setProfile] = useState<PerformerProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [errorModalMessage, setErrorModalMessage] = useState<string>('');
    const [successModal, setSuccessModal] = useState<boolean>(false);

    const headshotHandler = useImageHandler(1);
    const [headshotSelected, setHeadshotSelected] = useState<boolean>(false);
    const fullBodyHandler = useImageHandler(1);
    const [fullBodySelected, setFullBodySelected] = useState<boolean>(false);

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [heightInput, setHeightInput] = useState<string>('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/performer/get-profile', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setProfile(response.data);
            } catch (error) {
                setErrorMessage('Failed to load profile.');
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profile) return;

        const missing = getMissingRequiredFields(profile, headshotHandler.imageSelected && fullBodyHandler.imageSelected);
        if (missing.length > 0) {
            setErrorModalMessage(`Please fill out the following fields: ${missing.join(', ')}`);
            setErrorModal(true);
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        let uploadedHeadshotUrl = profile?.keyName || '';
        let uploadedFullBodyUrl = profile?.fullBodyKeyName || '';

        if (headshotHandler.croppedImageFile) {
            try {
                const formData = new FormData();
                formData.append('file', headshotHandler.croppedImageFile);

                const response = await axios.post(
                    'http://localhost:8080/api/cdn/upload-performer-profile-picture',
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                uploadedHeadshotUrl = response.data;
            } catch (error) {
                setErrorMessage('Failed to upload headshot.' + error);
                setLoading(false);
                return;
            }
        }

        if (fullBodyHandler.croppedImageFile) {
            try {
                const formData = new FormData();
                formData.append('file', fullBodyHandler.croppedImageFile);

                const response = await axios.post(
                    'http://localhost:8080/api/cdn/upload-performer-fullbody-picture',
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                uploadedFullBodyUrl = response.data;
            } catch (error) {
                setErrorMessage('Failed to upload full-body image.' + error);
                setLoading(false);
                return;
            }
        }

        console.log(uploadedFullBodyUrl);

        const updatedProfile = {
            ...profile,
            keyName: uploadedHeadshotUrl,
            fullBodyKeyName: uploadedFullBodyUrl,
        };

        const performerProfile = {
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            unionStatus: updatedProfile.unionStatus,
            unionId: updatedProfile.unionId,
            dateOfBirth: updatedProfile.dateOfBirth,
            socialInsuranceNumber: updatedProfile.socialInsuranceNumber,
            city: updatedProfile.city,
            state: updatedProfile.state,
            postalCode: updatedProfile.postalCode,
            country: "Canada",
            selfDrive: updatedProfile.selfDrive,
            gender: updatedProfile.gender,
            ethnicity: updatedProfile.ethnicity,
            hairColor: updatedProfile.hairColor,
            eyeColor: updatedProfile.eyeColor,
            sizeHeight: updatedProfile.sizeHeight,
            sizeWeight: updatedProfile.sizeWeight,
            sizeChest: updatedProfile.sizeChest,
            sizeWaist: updatedProfile.sizeWaist,
            sizeHips: updatedProfile.sizeHips,
            sizeShoe: updatedProfile.sizeShoe,
            sizeInseam: updatedProfile.sizeInseam,
            sizeSleeve: updatedProfile.sizeSleeve,
            sizeNeck: updatedProfile.sizeNeck,
            sizeHat: updatedProfile.sizeHat,
            sizeJacket: updatedProfile.sizeJacket,
            sizeBustCup: updatedProfile.sizeBustCup,
            sizeBustBand: updatedProfile.sizeBustBand,
            sizeDress: updatedProfile.sizeDress,
            keyName: updatedProfile.keyName,
            fullBodyKeyName: updatedProfile.fullBodyKeyName,
        };

        try {
            const response = await axios.put(
                'http://localhost:8080/api/performer/update-profile',
                performerProfile,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSuccessMessage('Profile updated successfully!');
            setSuccessModal(true);
        } catch (error) {
            setErrorMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/activate', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            setErrorMessage('Failed to activate user.');
        }

        setFormSubmitted(prev => !prev);
    };

    return (
        <div style={{marginTop: '200px'}}>
            {loading && <LoadingOverlay />}
            {errorModal && <ErrorModal title="Missing required fields" message={errorModalMessage} onClose={() => setErrorModal(false)}/>}
            {successModal && <ErrorModal title="Success" message="Profile updated successfully!" onClose={() => window.location.href = '/performer'}/>}

            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}

            <div className="UpdateProfile__signpost">
                <div className="Grid_grid__container Grid_grid__container__margin"
                style={numberOfColumnsStyle(16)}>
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 2, 8, 2, 8)}>
                        <div className="Signpost__signpost-container">
                            <p className="Signpost__eyebrow">update</p>
                            <h3 className="Signpost__title">Update your profile</h3>
                            <p className="Signpost__body">To activate your account, please complete your profile using the American measurement system (feet, inches, lbs).</p>
                        </div>
                    </div>
                    <div className="Grid_grid__item"
                    style={columnsStyle(1, 9, 1, 9, 9, 15, 9, 15)}>
                        <div className="UpdateForm__update-form-container">
                            {profile ? (
                                <form onSubmit={handleSubmit}>
                                    <p>
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
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
                                        <input type="file" accept="image/*" onChange={headshotHandler.onFileChange}/>
                                    </p>

                                    {headshotHandler.imageUrl && headshotHandler.showCrop && (
                                        <>
                                            <Cropper
                                                image={headshotHandler.imageUrl}
                                                crop={headshotHandler.crop}
                                                zoom={headshotHandler.zoom}
                                                aspect={headshotHandler.aspectRatio}
                                                onCropChange={headshotHandler.setCrop}
                                                onZoomChange={headshotHandler.setZoom}
                                                onCropComplete={headshotHandler.onCropComplete}
                                            />

                                            <Button buttonStyle="secondaryTextOnClick"
                                                    buttonOnClick={() => headshotHandler.onCropDone(profile?.firstName + '-head')}
                                                    buttonText="Submit"/>
                                        </>
                                    )}

                                    {headshotHandler.croppedImage && (
                                        <p>
                                            <img className="UpdateProfile__cropped-image-preview"
                                                 src={headshotHandler.croppedImage} alt="Headshot"/>
                                        </p>
                                    )}

                                    {profile.keyName != '' && !headshotHandler.croppedImage && (
                                        <p>
                                            <img className="UpdateProfile__cropped-image-preview" src={profile.keyName}
                                                 alt="Headshot"/>
                                        </p>
                                    )}

                                    <p>
                                        <label>Full Body Picture</label>
                                        <input type="file" accept="image/*" onChange={fullBodyHandler.onFileChange}/>
                                    </p>

                                    {fullBodyHandler.imageUrl && fullBodyHandler.showCrop && (
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

                                            <Button buttonStyle="secondaryTextOnClick"
                                                    buttonOnClick={() => fullBodyHandler.onCropDone(profile?.firstName + '-body')}
                                                    buttonText="Submit"/>
                                        </>
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
                                                onChange: (value) => setProfile({...profile, unionStatus: value}),
                                                defaultValue: profile.unionStatus,
                                            }}
                                        />
                                    </p>

                                    {(profile.unionStatus === 'AABP' || profile.unionStatus === 'ACTRA Full' || profile.unionStatus === 'ACTRA Apprentice') && (
                                        <p>
                                            <label>Union ID</label>
                                            <input
                                                type="text"
                                                value={profile.unionId}
                                                onChange={(e) => setProfile({...profile, unionId: e.target.value})}
                                            />
                                        </p>
                                    )}

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
                                                    {label: 'Non-Binary (Female Sizes)', value: 'non-binary-female'},
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
    );
}

export default UpdateProfile;