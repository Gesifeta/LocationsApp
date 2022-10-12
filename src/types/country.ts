
export type Country = {
    
    flag: string[],
    name:Name
    cca3:string
    capital: string
    population: number
    region:string
    subregion:string
    fifa:string,
    border:string[]
}
type Name = {
    common: string,
    nativeName:string
}

  
export type countries = {
    countries:[Country]
}