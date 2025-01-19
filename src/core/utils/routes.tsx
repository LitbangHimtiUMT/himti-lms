import AcaraView from "@features/admin/acara/view/acara";
import AddAcaraView from "@features/admin/acara/view/addAcara";
import DetailAcaraView from "@features/admin/acara/view/detailAcara";
import EditAcaraView from "@features/admin/acara/view/editAcara";
import AddAnggotaView from "@features/admin/anggota/view/addAnggota";
import { AnggotaView } from "@features/admin/anggota/view/Anggotas";
import EditAnggotaView from "@features/admin/anggota/view/editAnggota";
import { AngkatanView } from "@features/admin/angkatan/view/Angkatan";
import { CreateAngkatanView } from "@features/admin/angkatan/view/CreateAngkatan";
import { UpdateAngkatanView } from "@features/admin/angkatan/view/UpdateAngkatan";
import { DefaultView } from "@features/admin/default/Default";
import AddDosenView from "@features/admin/dosen/view/addDosen";
import { DosenView } from "@features/admin/dosen/view/Dosen";
import EditDosenView from "@features/admin/dosen/view/editDosen";
import AddStrukturalView from "@features/admin/struktural/view/addStruktural";
import EditStrukturalView from "@features/admin/struktural/view/editStruktural";
import StrukturalView from "@features/admin/struktural/view/struktural";
import { UserLoginView } from "@features/admin/user-login/views/UserLogin";
import { CreateUserView } from "@features/admin/users/view/CreateUser";
import { UpdateUserView } from "@features/admin/users/view/UpdateUser";
import { UserView } from "@features/admin/users/view/users";
import AdminView from "@features/admin/view/Admin";
import { AttendanceViews } from "@features/attendances/views/AttendanceViews";
import LoginView from "@features/auth/view/LoginView";
import { CreateEventMeetingViews } from "@features/event-meeting/views/CreateEventMeetingViews";
import { CreateMeetingViews } from "@features/event-meeting/views/CreateMeetingViews";
import { EventMeetingView } from "@features/event-meeting/views/EventMeeting";
import { EventMeetingDetail } from "@features/event-meeting/views/EventMeetingDetail";
import { UpdateEventMeetingViews } from "@features/event-meeting/views/UpdateEventMeetingViews";
import { UpdateMeetingViews } from "@features/event-meeting/views/UpdateMeetingViews";
import { VersionView } from "@features/version/view/version";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <LoginView />,
  },
  {
    path: "/",
    element: <AdminView />,
    children: [
      {
        path: "/",
        element: <DefaultView />,
      },
      {
        path: "/admin/acara",
        element: <AcaraView />,
      },
      {
        path: "/admin/acara/create",
        element: <AddAcaraView />,
      },
      {
        path: "/admin/acara/:id",
        element: <DetailAcaraView />,
      },
      {
        path: "/admin/acara/edit/:id",
        element: <EditAcaraView />,
      },
      {
        path: "/admin/user",
        element: <UserView />,
      },
      {
        path: "/admin/user/create",
        element: <CreateUserView />,
      },
      {
        path: "/admin/user/update/:id",
        element: <UpdateUserView />,
      },
      {
        path: "/admin/anggota",
        element: <AnggotaView />,
      },
      {
        path: "/admin/anggota/create",
        element: <AddAnggotaView />,
      },
      {
        path: "/admin/anggota/edit/:id",
        element: <EditAnggotaView />,
      },
      {
        path: "/admin/dosen",
        element: <DosenView />,
      },
      {
        path: "/admin/dosen/create",
        element: <AddDosenView />,
      },
      {
        path: "/admin/dosen/edit/:id",
        element: <EditDosenView />,
      },
      {
        path: "/admin/struktural",
        element: <StrukturalView />,
      },
      {
        path: "/admin/struktural/create",
        element: <AddStrukturalView />,
      },
      {
        path: "/admin/struktural/edit/:id",
        element: <EditStrukturalView />,
      },
      {
        path: "/admin/angkatan",
        element: <AngkatanView />,
      },
      {
        path: "/admin/angkatan/create",
        element: <CreateAngkatanView />,
      },
      {
        path: "/admin/angkatan/update/:id",
        element: <UpdateAngkatanView />,
      },
      {
        path: "/admin/user-login",
        element: <UserLoginView />,
      },
      {
        path: "/admin/event-meeting",
        element: <EventMeetingView />,
      },
      {
        path: "/admin/event-meeting/create",
        element: <CreateEventMeetingViews />,
      },
      {
        path: "/admin/event-meeting/update/:eventMeetingId",
        element: <UpdateEventMeetingViews />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId",
        element: <EventMeetingDetail />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId/meeting/create",
        element: <CreateMeetingViews />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId/meeting/update/:meetingId",
        element: <UpdateMeetingViews />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId/:meetingId",
        element: <AttendanceViews />,
      },
      {
        path: "/admin/version",
        element: <VersionView />,
      },
    ],
  },
]);
