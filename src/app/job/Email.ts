import Mail from '../lib/mail';

export default {
    key: 'RegistrationMail',
    async handle({ data }) {
        const { sendEmail: { name, email } } = data;

        await Mail.sendMail({
            from: 'Ecoleta <ecoleta@equipeecoleta.com.br>',
            to: `${name} <${email}>`,
            subject: 'Cadastro de ponto de coleta',
            html: `Olá, ${name}, Bem-vindo ao Ecoleta, obrigado
            por fazer parte de um luta por um mundo melhor :D.`,
        });
    }
}