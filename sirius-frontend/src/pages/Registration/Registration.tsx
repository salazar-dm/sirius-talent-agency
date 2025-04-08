import HeaderDetail from "../../templates/HeaderDetail/HeaderDetail.tsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.tsx";
import HeaderDetailSvgMonogramBlue from "../../templates/HeaderDetail/HeaderDetailSvgMonogramBlue.tsx";

function Registration() {
    return (
        <div>
            <HeaderDetail form={<RegistrationForm/>} monogram={<HeaderDetailSvgMonogramBlue/>} title="Registration"/>
        </div>
    );
}

export default Registration;