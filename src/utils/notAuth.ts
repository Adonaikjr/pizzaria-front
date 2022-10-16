import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

//paginas para visitantes 
export function notAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult <P> > => {
        
        const cookies = parseCookies(ctx);

//pagina logada
        if (cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
        }
    }
}
        
        return await fn(ctx);
    }
}