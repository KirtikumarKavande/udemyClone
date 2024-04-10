import { Compass, Layout, LucideIcon } from "lucide-react";


interface route{
    icon:LucideIcon,
    label:string,
    href:string
}

const guestRoutes:route[]=[
    {
        icon:Layout,
        label:"Dashboard",
        href:"/"
    },
    {
        icon:Compass,
        label:"Browse",
        href:"/search"
    }
]

export default guestRoutes