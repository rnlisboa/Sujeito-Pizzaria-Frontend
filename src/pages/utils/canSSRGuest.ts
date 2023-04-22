import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import {parseCookies} from "nookies"

//função para páginas que só pode ser acessadas por visistantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>>=>{
        const cookies = parseCookies(context);
        if(cookies['@nextauth.token']){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(context);
    }
}