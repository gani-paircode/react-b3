import { TAB_IDS } from "../../constants/general";

export const getPersonNameLabel = record => record ? `${record.name} - ${record.phone} (${record.city})` : '';

export const getMemberDetailsRoute = id => `/${TAB_IDS.MEMBERS}/${id}`;