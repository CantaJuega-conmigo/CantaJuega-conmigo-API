
export function confirmEmailTemplate({
    firstName,
    lastName,
    token,
}) : string{
    return `    
    <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
            <h1 style="text-align: center; color: #000;">Bienvenido a Canta Juega Conmigo</h1>
            <p style="text-align: center; color: #000;">Hola ${firstName} ${lastName}, bienvenido a Canta Juega Conmigo</p>
            <p style="text-align: center; color: #000;">Para confirmar tu cuenta, por favor haz click en el siguiente enlace</p>
            <div style="text-align: center;">
                <a href="${process.env.BACK_URL}/auth/confirm-email?auth=${token}" style="background-color: #000; color: #fff; padding: 10px; border-radius: 10px; text-decoration: none;">Confirmar cuenta</a>
            </div>
        </div>
    </div>
    `;
}