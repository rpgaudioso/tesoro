import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import WelcomeTour from './components/Onboarding/WelcomeTour';
import { ToastProvider } from './components/UI';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import BudgetsPage from './pages/BudgetsPage';
import CategoriesPage from './pages/CategoriesPage';
import CreditCardDetailPage from './pages/CreditCardDetailPage';
import CreditCardsPage from './pages/CreditCardsPage';
import DashboardPage from './pages/DashboardPage';
import AutoCompleteDetailPage from './pages/DesignSystem/AutoCompleteDetailPage';
import AvatarGroupDetailPage from './pages/DesignSystem/AvatarGroupDetailPage';
import BannerDetailPage from './pages/DesignSystem/BannerDetailPage';
import CarouselDetailPage from './pages/DesignSystem/CarouselDetailPage';
import ColorPickerDetailPage from './pages/DesignSystem/ColorPickerDetailPage';
import AccordionDetailPage from './pages/DesignSystem/components/AccordionDetailPage';
import AILabelDetailPage from './pages/DesignSystem/components/AILabelDetailPage';
import AlertDetailPage from './pages/DesignSystem/components/AlertDetailPage';
import BadgeDetailPage from './pages/DesignSystem/components/BadgeDetailPage';
import BreadcrumbDetailPage from './pages/DesignSystem/components/BreadcrumbDetailPage';
import ButtonDetailPage from './pages/DesignSystem/components/ButtonDetailPage';
import CardDetailPage from './pages/DesignSystem/components/CardDetailPage';
import CheckboxDetailPage from './pages/DesignSystem/components/CheckboxDetailPage';
import CodeBlockDetailPage from './pages/DesignSystem/components/CodeBlockDetailPage';
import ConfirmDialogDetailPage from './pages/DesignSystem/components/ConfirmDialogDetailPage';
import ContainedListDetailPage from './pages/DesignSystem/components/ContainedListDetailPage';
import ContentSwitcherDetailPage from './pages/DesignSystem/components/ContentSwitcherDetailPage';
import DataTableDetailPage from './pages/DesignSystem/components/DataTableDetailPage';
import DatePickerDetailPage from './pages/DesignSystem/components/DatePickerDetailPage';
import DropdownDetailPage from './pages/DesignSystem/components/DropdownDetailPage';
import EmptyStateDetailPage from './pages/DesignSystem/components/EmptyStateDetailPage';
import FormGroupDetailPage from './pages/DesignSystem/components/FormGroupDetailPage';
import IconButtonDetailPage from './pages/DesignSystem/components/IconButtonDetailPage';
import InlineLoadingDetailPage from './pages/DesignSystem/components/InlineLoadingDetailPage';
import InputDetailPage from './pages/DesignSystem/components/InputDetailPage';
import LinkDetailPage from './pages/DesignSystem/components/LinkDetailPage';
import ListDetailPage from './pages/DesignSystem/components/ListDetailPage';
import LoadingDetailPage from './pages/DesignSystem/components/LoadingDetailPage';
import MenuButtonDetailPage from './pages/DesignSystem/components/MenuButtonDetailPage';
import ModalDetailPage from './pages/DesignSystem/components/ModalDetailPage';
import NotificationDetailPage from './pages/DesignSystem/components/NotificationDetailPage';
import NumberInputDetailPage from './pages/DesignSystem/components/NumberInputDetailPage';
import PageHeaderDetailPage from './pages/DesignSystem/components/PageHeaderDetailPage';
import PaginationDetailPage from './pages/DesignSystem/components/PaginationDetailPage';
import PopoverDetailPage from './pages/DesignSystem/components/PopoverDetailPage';
import PortalDetailPage from './pages/DesignSystem/components/PortalDetailPage';
import ProgressBarDetailPage from './pages/DesignSystem/components/ProgressBarDetailPage';
import ProgressIndicatorDetailPage from './pages/DesignSystem/components/ProgressIndicatorDetailPage';
import RadioButtonDetailPage from './pages/DesignSystem/components/RadioButtonDetailPage';
import SearchDetailPage from './pages/DesignSystem/components/SearchDetailPage';
import SelectDetailPage from './pages/DesignSystem/components/SelectDetailPage';
import SliderDetailPage from './pages/DesignSystem/components/SliderDetailPage';
import StructuredListDetailPage from './pages/DesignSystem/components/StructuredListDetailPage';
import TabsDetailPage from './pages/DesignSystem/components/TabsDetailPage';
import TagDetailPage from './pages/DesignSystem/components/TagDetailPage';
import TextareaDetailPage from './pages/DesignSystem/components/TextareaDetailPage';
import TileDetailPage from './pages/DesignSystem/components/TileDetailPage';
import ToastDetailPage from './pages/DesignSystem/components/ToastDetailPage';
import ToggleDetailPage from './pages/DesignSystem/components/ToggleDetailPage';
import ToggletipDetailPage from './pages/DesignSystem/components/ToggletipDetailPage';
import TooltipDetailPage from './pages/DesignSystem/components/TooltipDetailPage';
import TreeViewDetailPage from './pages/DesignSystem/components/TreeViewDetailPage';
import CurrencyInputDetailPage from './pages/DesignSystem/CurrencyInputDetailPage';
import DateRangePickerDetailPage from './pages/DesignSystem/DateRangePickerDetailPage';
import DesignSystemOverviewPage from './pages/DesignSystem/DesignSystemOverviewPage';
import DesignTokensPage from './pages/DesignSystem/DesignTokensPage';
import DrawerDetailPage from './pages/DesignSystem/DrawerDetailPage';
import FileUploadDragDropDetailPage from './pages/DesignSystem/FileUploadDragDropDetailPage';
import MultiSelectDetailPage from './pages/DesignSystem/MultiSelectDetailPage';
import RatingDetailPage from './pages/DesignSystem/RatingDetailPage';
import SkeletonDetailPage from './pages/DesignSystem/SkeletonDetailPage';
import SparklineDetailPage from './pages/DesignSystem/SparklineDetailPage';
import StatisticsCardDetailPage from './pages/DesignSystem/StatisticsCardDetailPage';
import StatusIndicatorDetailPage from './pages/DesignSystem/StatusIndicatorDetailPage';
import StepperDetailPage from './pages/DesignSystem/StepperDetailPage';
import TimelineDetailPage from './pages/DesignSystem/TimelineDetailPage';
import DesignSystemPage from './pages/DesignSystemPage';
import { Imports } from './pages/Imports';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import LoginPage from './pages/LoginPage';
import RecurringTransactionsPage from './pages/RecurringTransactionsPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
import TransactionsPage from './pages/TransactionsPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Welcome Tour Route (outside AppLayout) */}
        <Route
          path="/app/welcome"
          element={
            <PrivateRoute>
              <WelcomeTour />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="recurring-transactions" element={<RecurringTransactionsPage />} />
          <Route path="imports" element={<Imports />} />
          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="credit-cards" element={<CreditCardsPage />} />
          <Route path="credit-cards/:cardId" element={<CreditCardDetailPage />} />
          <Route path="invoices/:invoiceId" element={<InvoiceDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Design System Routes */}
          <Route path="design-system">
            <Route index element={<DesignSystemOverviewPage />} />
            <Route path="old" element={<DesignSystemPage />} />
            <Route path="tokens" element={<DesignTokensPage />} />
            
            {/* Component Pages */}
            <Route path="accordion" element={<AccordionDetailPage />} />
            <Route path="ailabel" element={<AILabelDetailPage />} />
            <Route path="alert" element={<AlertDetailPage />} />
            <Route path="badge" element={<BadgeDetailPage />} />
            <Route path="breadcrumb" element={<BreadcrumbDetailPage />} />
            <Route path="button" element={<ButtonDetailPage />} />
            <Route path="card" element={<CardDetailPage />} />
            <Route path="checkbox" element={<CheckboxDetailPage />} />
            <Route path="codeblock" element={<CodeBlockDetailPage />} />
            <Route path="confirmdialog" element={<ConfirmDialogDetailPage />} />
            <Route path="containedlist" element={<ContainedListDetailPage />} />
            <Route path="contentswitcher" element={<ContentSwitcherDetailPage />} />
            <Route path="datatable" element={<DataTableDetailPage />} />
            <Route path="datepicker" element={<DatePickerDetailPage />} />
            <Route path="dropdown" element={<DropdownDetailPage />} />
            <Route path="emptystate" element={<EmptyStateDetailPage />} />
            <Route path="formgroup" element={<FormGroupDetailPage />} />
            <Route path="iconbutton" element={<IconButtonDetailPage />} />
            <Route path="inlineloading" element={<InlineLoadingDetailPage />} />
            <Route path="input" element={<InputDetailPage />} />
            <Route path="link" element={<LinkDetailPage />} />
            <Route path="list" element={<ListDetailPage />} />
            <Route path="loading" element={<LoadingDetailPage />} />
            <Route path="menubutton" element={<MenuButtonDetailPage />} />
            <Route path="modal" element={<ModalDetailPage />} />
            <Route path="notification" element={<NotificationDetailPage />} />
            <Route path="numberinput" element={<NumberInputDetailPage />} />
            <Route path="pageheader" element={<PageHeaderDetailPage />} />
            <Route path="pagination" element={<PaginationDetailPage />} />
            <Route path="popover" element={<PopoverDetailPage />} />
            <Route path="portal" element={<PortalDetailPage />} />
            <Route path="progressbar" element={<ProgressBarDetailPage />} />
            <Route path="progressindicator" element={<ProgressIndicatorDetailPage />} />
            <Route path="radiobutton" element={<RadioButtonDetailPage />} />
            <Route path="search" element={<SearchDetailPage />} />
            <Route path="select" element={<SelectDetailPage />} />
            <Route path="slider" element={<SliderDetailPage />} />
            <Route path="structuredlist" element={<StructuredListDetailPage />} />
            <Route path="tabs" element={<TabsDetailPage />} />
            <Route path="tag" element={<TagDetailPage />} />
            <Route path="textarea" element={<TextareaDetailPage />} />
            <Route path="tile" element={<TileDetailPage />} />
            <Route path="toast" element={<ToastDetailPage />} />
            <Route path="toggle" element={<ToggleDetailPage />} />
            <Route path="toggletip" element={<ToggletipDetailPage />} />
            <Route path="tooltip" element={<TooltipDetailPage />} />
            <Route path="treeview" element={<TreeViewDetailPage />} />
            
            {/* New Components */}
            <Route path="autocomplete" element={<AutoCompleteDetailPage />} />
            <Route path="avatargroup" element={<AvatarGroupDetailPage />} />
            <Route path="banner" element={<BannerDetailPage />} />
            <Route path="carousel" element={<CarouselDetailPage />} />
            <Route path="colorpicker" element={<ColorPickerDetailPage />} />
            <Route path="currencyinput" element={<CurrencyInputDetailPage />} />
            <Route path="daterangepicker" element={<DateRangePickerDetailPage />} />
            <Route path="drawer" element={<DrawerDetailPage />} />
            <Route path="fileupload" element={<FileUploadDragDropDetailPage />} />
            <Route path="multiselect" element={<MultiSelectDetailPage />} />
            <Route path="rating" element={<RatingDetailPage />} />
            <Route path="skeleton" element={<SkeletonDetailPage />} />
            <Route path="sparkline" element={<SparklineDetailPage />} />
            <Route path="statcard" element={<StatisticsCardDetailPage />} />
            <Route path="statusindicator" element={<StatusIndicatorDetailPage />} />
            <Route path="stepper" element={<StepperDetailPage />} />
            <Route path="timeline" element={<TimelineDetailPage />} />
            
            <Route path="numberinput" element={<NumberInputDetailPage />} />
            <Route path="pageheader" element={<PageHeaderDetailPage />} />
            <Route path="pagination" element={<PaginationDetailPage />} />
            <Route path="popover" element={<PopoverDetailPage />} />
            <Route path="portal" element={<PortalDetailPage />} />
            <Route path="progressbar" element={<ProgressBarDetailPage />} />
            <Route path="progressindicator" element={<ProgressIndicatorDetailPage />} />
            <Route path="radiobutton" element={<RadioButtonDetailPage />} />
            <Route path="search" element={<SearchDetailPage />} />
            <Route path="select" element={<SelectDetailPage />} />
            <Route path="slider" element={<SliderDetailPage />} />
            <Route path="tabs" element={<TabsDetailPage />} />
            <Route path="tag" element={<TagDetailPage />} />
            <Route path="textarea" element={<TextareaDetailPage />} />
            <Route path="toast" element={<ToastDetailPage />} />
            <Route path="toggle" element={<ToggleDetailPage />} />
            <Route path="tooltip" element={<TooltipDetailPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/app" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
