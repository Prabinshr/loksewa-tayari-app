/**
 * Generates a random OTP of length n
 * @param n The length of the OTP
 */


export const generateOTP = async (n: number) => {
  let OTP = '';
  const possible = '0123456789';
  for (let i = 0; i < n; i++) {
    OTP += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return OTP;
};
