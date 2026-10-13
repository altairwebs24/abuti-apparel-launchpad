const base = `${import.meta.env['VITE_SUPABASE_URL']}/storage/v1/object/public/abuti-media/brand`;
const img = (name: string) => `${base}/${name}.jpg`;
export const media = { logo:img('logo'), hero:img('hero'), flatlay:img('flatlay'), hoodie:img('hoodie'), night:img('night'), green:img('green'), blue:img('blue'), couple:img('couple'), red:img('red'), statement:img('statement'), team:img('team') };
