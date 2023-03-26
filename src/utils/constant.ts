export const jwtSecret = process.env.JWT_SECRET;
export enum OTPType {
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    PASSWORD_RESET = 'PASSWORD_RESET',
    OTHER = 'OTHER'
}
