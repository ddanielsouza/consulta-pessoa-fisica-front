export const msgs = {
    CAMPO_INVALIDO: 'Campo :campo inválido',
}

export const getMSG = (msg, name) =>{
    return msg.replace(/:campo/im, name);
}