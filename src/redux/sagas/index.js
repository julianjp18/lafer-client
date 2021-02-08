import { all } from 'redux-saga/effects';
import { signInWatcher } from './auth/signIn';
import { signUpWatcher } from './auth/signUp';
import { vehicleWatcher } from './SOAT/vehicle';
import { clientWatcher } from './SOAT/client';
import { soatWatcher } from './SOAT/soat';
import { secureCarWatcher } from './car';
import { countriesWatcher } from './admin/countries';
import { mainActivitiesWatcher } from './admin/mainActivities';
import { mediumResponsesWatcher } from './admin/mediumResponses';
import { linkClassesWatcher } from './admin/linkClasses';
import { PQRContactsWatcher } from './admin/PQRContacts';
import { typeActivitiesWatcher } from './admin/typeActivities';
import { productsWatcher } from './admin/products';
import { insurersWatcher } from './admin/insurers';
import { typeOperationsWatcher } from './admin/typeOperations';
import { typeIndustriesWatcher } from './admin/typeIndustries';
import { typeIdentificationsWatcher } from './admin/typeIdentifications';
import { typeCompaniesWatcher } from './admin/typeCompanies';
import { requestTypesWatcher } from './admin/requestTypes';

export default function* rootSaga() {
  yield all([
    signInWatcher(),
    signUpWatcher(),
    vehicleWatcher(),
    soatWatcher(),
    clientWatcher(),
    secureCarWatcher(),
    countriesWatcher(),
    mainActivitiesWatcher(),
    mediumResponsesWatcher(),
    linkClassesWatcher(),
    PQRContactsWatcher(),
    typeActivitiesWatcher(),
    productsWatcher(),
    insurersWatcher(),
    typeOperationsWatcher(),
    typeIndustriesWatcher(),
    typeIdentificationsWatcher(),
    typeCompaniesWatcher(),
    requestTypesWatcher(),
  ]);
};
