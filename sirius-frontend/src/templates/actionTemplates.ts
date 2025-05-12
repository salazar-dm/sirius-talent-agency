import {SendAvailabilityCheckForm} from "../components/ProjectDayAction/SendAvailabilityCheckForm.tsx";
import {ConfirmPerformersForm} from "../components/ProjectDayAction/ConfirmPerformersForm.tsx";
import {BlacklistPerformersForm} from "../components/ProjectDayAction/BlacklistPerformersForm.tsx";
import {CreateCallSheetForm} from "../components/ProjectDayAction/CreateCallSheetForm.tsx";
import {CreateFittingSheetForm} from "../components/ProjectDayAction/CreateFittingSheetForm.tsx";
import {ExportCallSheetForm} from "../components/ProjectDayAction/ExportCallSheetForm.tsx";
import {ExportFittingSheetForm} from "../components/ProjectDayAction/ExportFittingSheetForm.tsx";
import {ExportPerformerListForm} from "../components/ProjectDayAction/ExportPerformerListForm.tsx";
import {MassEmailForm} from "../components/ProjectDayAction/MassEmailForm.tsx";
import {SendCallTimeForm} from "../components/ProjectDayAction/SendCallTimeForm.tsx";
import {EditProductionDayForm} from "../components/ProjectDayAction/EditProductionDayForm.tsx";
import {ArchiveProductionDayForm} from "../components/ProjectDayAction/ArchiveProductionDayForm.tsx";
import {DeleteProductionDayForm} from "../components/ProjectDayAction/DeleteProductionDayForm.tsx";

export const actionTemplates = {
    sendAvailabilityCheck: {
        title: "Send Availability Check",
        render: SendAvailabilityCheckForm,
    },
    confirmPerformers: {
        title: "Confirm Performers",
        render: ConfirmPerformersForm,
    },
    blacklistPerformers: {
        title: "Blacklist Performers",
        render: BlacklistPerformersForm,
    },
    createCallSheet: {
        title: "Create Call Sheet",
        render: CreateCallSheetForm,
    },
    createFittingSheet: {
        title: "Create Fitting Sheet",
        render: CreateFittingSheetForm,
    },
    exportCallSheet: {
        title: "Export Call Sheet",
        render: ExportCallSheetForm,
    },
    exportFittingSheet: {
        title: "Export Fitting Sheet",
        render: ExportFittingSheetForm,
    },
    exportPerformerList: {
        title: "Export Full Performer List",
        render: ExportPerformerListForm,
    },
    massEmail: {
        title: "Mass Email",
        render: MassEmailForm,
    },
    sendCallTime: {
        title: "Send Draft/Final Call Time",
        render: SendCallTimeForm,
    },
    editProductionDay: {
        title: "Edit Production Day Info",
        render: EditProductionDayForm,
    },
    archiveProductionDay: {
        title: "Archive Production Day",
        render: ArchiveProductionDayForm,
    },
    deleteProductionDay: {
        title: "Delete Production Day",
        render: DeleteProductionDayForm,
    },
};
