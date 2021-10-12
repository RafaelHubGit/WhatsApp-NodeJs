import whatsAppRoutes from '../routes/whatsApp';

export const routes = ( app: any ) => {
    const url = '/api'
    const apiPaths = {
        whatsApp: `${url}/whatsApp`
    }
    app.use( apiPaths.whatsApp, whatsAppRoutes );
}