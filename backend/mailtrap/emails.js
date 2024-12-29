import { mailtrapClient, sender } from "./mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../mailtrap/emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email send successfully", response)
    } catch (error) {
        console.log(`Error sending verifycation`, error)
        throw new Error(`Error sending verification email : ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "b755cdfb-4459-4fe8-95c4-6f31b701bd05",
            template_variables:{
                "company_info_name": "Authnd Company",
                "name": name
            }
        })

        console.log("Welcome email send successfully", response);
    } catch (error) {
        
    }
}

export const sendPasswordResetEmail = async (email, resetURL)=> {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })

        console.log("Password reset email send successfully", response);
    } catch (error) {
        console.log(`Error sending password reset email`, error)
        throw new Error(`Error sending password reset email : ${error}`)
    }
}