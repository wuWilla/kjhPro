class Verification{
    phoneNumberRegexp = /^[1][3,4,5,7,8][0-9]{9}$/;
    checkPhoneNumber(phoneNumber){
        return this.phoneNumberRegexp.test(phoneNumber);
    }
}

export default new Verification();
