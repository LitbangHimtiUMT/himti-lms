import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../../features/_global/components/NotFound";
import { RootViews } from "../../features/_global/views";
import { AuthLayout } from "../../features/_global/views/AuthLayout";
import { DashboardRoot } from "../../features/_global/views/DashboardRoot";
import { InvitationRoot } from "../../features/_global/views/InvitationRoot";
import { Playground } from "../../features/_global/views/playground";
import { SignInViews } from "../../features/authentication/views/sign-in";
import { SignUpViews } from "../../features/authentication/views/sign-up";
import { ForgotPasswordViews } from "../../features/authentication/views/forgot-password/ForgotPasswordViews";
import { ClassViews } from "../../features/class/views/ClassViews";
import { CreateClassessViews } from "../../features/dashboard/views/CreateClassessViews";
import { CreateModules } from "../../features/dashboard/views/CreateModules";
import { DetailModuleView } from "../../features/dashboard/views/DetailModuleView";
import { DetailSessionView } from "../../features/dashboard/views/DetailSessionView";
import { EnrolledClassViews } from "../../features/dashboard/views/EnrolledClassViews";
import { MyClassViews } from "../../features/dashboard/views/MyClassViews";
import { FaqViews } from "../../features/faq/views/FaqViews";
import { HomeViews } from "../../features/home/views/HomeViews";
import { InvitationUseCodeViews } from "../../features/invitations/views/InvitationUseCodeViews";
import { MentorViews } from "../../features/mentor/views/MentorViews";
import { SessionViews } from "../../features/dashboard/views/SessionViews";
import { ClassDetailView } from "@features/class/views/ClassDetailView";
import { LearningDashboardView } from "@features/learning/views/LearningView";
import { LearningUserRoot } from "../../features/_global/views/LearningUserRoot";
import { AssignmentDetailView } from "../../features/learning/views/AssignmentDetailView";
import { DetailAssignmentView } from "../../features/dashboard/views/DetailAssignmentViews";
import { CertificatesViews } from "../../features/certificates/views/CertificatesViews";
import CoursePage from "@features/course/CoursePage";
import CourseCatalogPage from "@features/course/CourseCatalogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootViews />,
    children: [
      {
        path: "/",
        element: <HomeViews />,
      },
      {
        path: "/class",
        element: <ClassViews />,
      },
      {
        path: "/class-detail/:id",
        element: <ClassDetailView />,
      },
      {
        path: "/mentors",
        element: <MentorViews />,
      },
      {
        path: "/faq",
        element: <FaqViews />,
      },
      {
        path: "/courses",
        element: <CourseCatalogPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignInViews />,
      },
      {
        path: "/sign-up",
        element: <SignUpViews />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordViews />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [
      {
        path: "/dashboard/my-class",
        element: <MyClassViews />,
      },
      {
        path: "/dashboard/enrolled-class",
        element: <EnrolledClassViews />,
      },
      {
        path: "/dashboard/my-class/:classId",
        element: <SessionViews />,
      },
      {
        path: "/dashboard/my-class/create",
        element: <CreateClassessViews />,
      },
      {
        path: "/dashboard/:classId/:sessionId/create-modules",
        element: <CreateModules />,
      },
      {
        path: "/dashboard/:classId/:sessionId",
        element: <DetailSessionView />,
      },
      {
        path: "/dashboard/:classId/:sessionId/:moduleId",
        element: <DetailModuleView />,
      },
      {
        path: "/dashboard/:classId/:sessionId/:moduleId/:assignmentId",
        element: <DetailAssignmentView />,
      },
      {
        path: "/dashboard/certificates",
        element: <CertificatesViews />,
      },
    ],
  },
  {
    path: "/invitation",
    element: <InvitationRoot />,
    children: [
      {
        path: "/invitation/:code",
        element: <InvitationUseCodeViews />,
      },
    ],
  },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    path: "/course/:courseId",
    element: <CoursePage />,
  },
  {
    path: "/learning",
    element: <LearningUserRoot />,
    children: [
      {
        path: "/learning/:classId",
        element: <LearningDashboardView />,
      },
      {
        path: "/learning/:classId/assignment/:assignmentId/:submissionId?",
        element: <AssignmentDetailView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
