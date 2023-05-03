import React from 'react'
import logoVN from "../assets/logo-vn.png";
import logoJP from "../assets/logo-jp.png";
import logoEN from "../assets/logo-en.png";
import logoUK from "../assets/logo-uk.png";


export const FlagVN = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoVN} alt="Logo Vietnam" width={"30px"} />&nbsp;
            <span className='text-slate-900 dark:text-white'>VI</span>
        </div>
    )
}
export const FlagEN = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoUK} alt="Logo EN" width={"30px"} />&nbsp;
            <span className='text-slate-900 dark:text-white'>EN</span>
        </div>
    )
}
export const FlagUS = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoUS} alt="Logo US" width={"30px"} />&nbsp;
            <span className='text-slate-900 dark:text-white'>US</span>
        </div>
    )
}
export const FlagJP = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoJP} alt="Logo JP" width={"30px"} />&nbsp;
            <span className='text-slate-900 dark:text-white'>JA</span>
        </div>
    )
}