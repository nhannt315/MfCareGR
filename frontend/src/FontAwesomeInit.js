import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faHospital, faUserMd, faBed, faToggleOn, faNewspaper,
  faChevronRight, faChevronLeft, faListUl, faFile, faPencilAlt,
  faExclamationTriangle, faTimes, faMeh, faStickyNote, faFrown,
  faMedkit, faMagic, faArrowCircleUp, faComments, faThumbsUp, faHeart, faComment,
  faPaperPlane, faBan, faQuestionCircle, faPlusCircle, faTimesCircle, faAngleDoubleRight,
  faTags, faGraduationCap, faStethoscope, faBook, faMapMarker, faHeartbeat, faLanguage, faUniversity,
  faAngleDown, faFilter, faInfoCircle, faBriefcase, faHospitalAlt, faList, faTrophy, faGlobe, faAngleRight,

} from '@fortawesome/free-solid-svg-icons';

const init = () => {
  library.add(
    fab, faHospital, faUserMd, faBed, faToggleOn, faNewspaper, faChevronRight,
    faChevronLeft, faListUl, faFile, faPencilAlt,
    faExclamationTriangle, faTimes, faMeh, faStickyNote, faFrown,
    faMedkit, faMagic, faArrowCircleUp, faComments, faThumbsUp, faHeart, faComment,
    faPaperPlane, faBan, faQuestionCircle, faPlusCircle, faTimesCircle, faAngleDoubleRight,
    faTags, faGraduationCap, faStethoscope, faBook, faMapMarker, faHeartbeat, faLanguage, faUniversity,
    faAngleDown, faFilter, faInfoCircle, faBriefcase, faHospitalAlt, faList, faTrophy, faGlobe, faAngleRight,
  );
};

export default init;
