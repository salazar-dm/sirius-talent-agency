export const calculateAge = (date: string | undefined): number => {
    if (!date) {
        return 0;
    }

    const birthDate = new Date(date);  // Create Date object from DOB
    const today = new Date();         // Get today's date
    let age = today.getFullYear() - birthDate.getFullYear(); // Basic year difference

    const month = today.getMonth();
    const day = today.getDate();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
        age--;
    }

    return age;
};