// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
// core components/views for RTL layout
import NacMain from "views/Nac/NacMain.jsx";
import NACQueue from "views/Nac/NACQueue.jsx";
import NACBranch from "views/Nac/NACBranch.jsx";
import NACBranch3 from "views/Nac/NACBranch3.jsx";
import NacList from "views/Nac/NacList.jsx";
import NACBranchConfirm from "views/Nac/NACBranchConfirm.jsx";
import NACSubmitted from "views/Nac/NACSubmitted.jsx";

const dashboardRoutes = [
  {
    path: "#", //"/dashboard",
    name: "Dashboard",
    rtlName:"",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    activeLink: false
  },
  {
    path: "/naclist", //"/typography",
    name: "Inquiry",
    rtlName:"",
    icon: LibraryBooks,
    component: NacList,
    layout: "/admin",
    activeLink: true
  },
  {
    path: "/nacmain",
    name: "Open Account",
    rtlName:"",
    icon: NoteAdd,
    component: NacMain,
    layout: "/admin",
    activeLink: true
  },
  {
    path: "#", //"/notifications",
    name: "TD Disposition",
    rtlName:"",
    icon: LibraryBooks,
    component: NotificationsPage,
    layout: "/admin",
    activeLink: true
  },
  {
    path: "#", //"/dashboard",
    name: "Maintenance",
    rtlName:"",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    activeLink:   true
  } ,
  {
    path: "/nacqueue", //"/user",
    name: "NAC Review",
    rtlName:"hidden",
    icon: LibraryBooks,
    component: NACQueue,
    layout: "/admin",
    activeLink:   true
  } ,
  {
    path: "/nacbranch", //"/user",
    name: " ",
    rtlName:"hidden",
    icon: LibraryBooks,
    component: NACBranch,
    layout: "/admin",
    activeLink:   true
  } ,
  {
    path: "/nacbranch3", //"/user",
    name: " ",
    rtlName:"hidden",
    icon: LibraryBooks,
    component: NACBranch3,
    layout: "/admin",
    activeLink:   true
  } ,
  {
    path: "/nacbranchconfirm", //"/user",
    name: " ",
    rtlName:"hidden",
    icon: LibraryBooks,
    component: NACBranchConfirm,
    layout: "/admin",
    activeLink:   true
  } ,
  {
    path: "/nacsubmitted", //"/user",
    name: "Application Submitted",
    rtlName:"hidden",
    icon: LibraryBooks,
    component: NACSubmitted,
    layout: "/admin",
    activeLink:   true
  } 
];

export default dashboardRoutes;
