import ApiService from './Api';
import { BASE_URL, MEDICINE_CLASSES, GET_DISEASES,
  getMedicineType, getMedicineList, MOST_VIEWED_DISEASES,
  getMedicineDetail, getSameTypeMedicine, getDiseaseDetail } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const diseaseMedicineApi = {};

diseaseMedicineApi.getMedicineClasses = () => client.get(MEDICINE_CLASSES);
diseaseMedicineApi.getMedicineType = (slug, page) => client.get(getMedicineType(slug, page));
diseaseMedicineApi.getMedicineList = (page) => client.get(getMedicineList(page));
diseaseMedicineApi.getMedicineDetail = (slug) => client.get(getMedicineDetail(slug));
diseaseMedicineApi.getSameTypeMedicine = (slug) => client.get(getSameTypeMedicine(slug));
diseaseMedicineApi.getDiseases = () => client.get(GET_DISEASES);
diseaseMedicineApi.getDiseaseDetail = (slug) => client.get(getDiseaseDetail(slug));
diseaseMedicineApi.getMostViewedDiseases = () => client.get(MOST_VIEWED_DISEASES);

export default diseaseMedicineApi;