import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
export const sideBarItems = [
    {
        title: "Dashboard",
        icon: DashboardOutlinedIcon,
        route: '/'
    },
    {
        title: "Create New Election",
        icon: CampaignOutlinedIcon,
        route: '/new-election'
    }
    ,
    {
        title: "Register Voters",
        icon: AccountCircleOutlinedIcon,
        route: '/registerVoters'
    },
    {
        title: "Register Candidate",
        icon: GroupAddIcon,
        route: 'candidate-registration'
    },
    {

        title: "Logout",
        icon: LogoutOutlinedIcon,
        route: ''
    },

]