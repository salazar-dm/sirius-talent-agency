import React from "react";
import "./Footer.css";
import "C:/Users/traxler/training/sirius/src/App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";

const Footer:React.FC = () => {


    return (
     <footer>
         <div id="footer">
             <div className="Footer_footer">
                 <div className="Grid_grid__container Grid_grid__container__margin"
                 style={numberOfColumnsStyle(16)}>
                     <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 1, 12, 3, 12)}>
                         <div className="Grid_grid__container"
                         style={numberOfColumnsStyle(9)}>
                             <div className="Grid_grid__item"
                                  style={columnsStyle(1, 10, 1, 10, 2, 5, 1, 4)}>
                                 <div className="Footer_footer__link-list">
                                     <div className="Footer_footer__list-header">
                                         <h3 className="Footer_footer__title">Services</h3>
                                     </div>
                                     <div className="Footer_footer__list-body">

                                     </div>
                                 </div>
                             </div>
                             <div className="Grid_grid__item"
                                  style={columnsStyle(1, 10, 1, 10, 6, 9, 4, 7)}>
                                 <div className="Footer_footer__link-list">
                                     <div className="Footer_footer__list-header">
                                         <h3 className="Footer_footer__title">Quality</h3>
                                     </div>
                                     <div className="Footer_footer__list-body">

                                     </div>
                                 </div>
                             </div>
                             <div className="Grid_grid__item"
                                  style={columnsStyle(1, 10, 1, 10, 10, 13, 7, 10)}>
                                 <div className="Footer_footer__link-list">
                                     <div className="Footer_footer__list-header">
                                         <h3 className="Footer_footer__title">Firm</h3>
                                     </div>
                                     <div className="Footer_footer__list-body">

                                     </div>
                                 </div>
                             </div>
                             <div className="Grid_grid__item"
                                  style={columnsStyle(1, 5, 1, 5, 2, 14, 1, 14)}>
                                 <ul className="Footer_footer__hygiene-list">
                                     <li><a href="/" className="Footer_footer__hygiene-link">Accessibility</a></li>
                                     <li><a href="/" className="Footer_footer__hygiene-link">Cookie policy</a></li>
                                     <li><a href="/" className="Footer_footer__hygiene-link">Privacy policy</a></li>
                                     <li><a href="/" className="Footer_footer__hygiene-link">Legal notices</a></li>
                                 </ul>
                             </div>
                         </div>


                     </div>
                     <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 14, 17, 12, 17)}>
                         <div className="Footer_footer__social-wrapper">
                             <div className="Grid_grid__container Grid_grid__full-height"
                             style={numberOfColumnsStyle(4)}>
                                 <div className="Grid_grid__item"
                                 style={columnsStyle(1, 5, 1, 5, 2, 6, 2, 6)}>
                                     <div className="Footer_footer__social-list">
                                         <div className="Footer_footer__social-list-inner">
                                             <div className="Footer_footer__list-header">
                                                 <h3 className="Footer_footer__title">Social</h3>
                                             </div>
                                             <div className="Footer_footer__social-list-body">
                                                 <ul>
                                                     <li className="Footer_footer__list-item-social Footer_footer__list-item">
                                                         <svg height="20px"
                                                              viewBox="0 0 20 20"
                                                              width="20px">
                                                             <path className="Footer_footer__list-item-social-icon"
                                                                   d="M17.56,0C18.91,0,20,1.09,20,2.44v15.11c0,1.35-1.09,2.44-2.44,2.44H2.44c-1.35,0-2.44-1.09-2.44-2.44V2.44C0,1.09,1.09,0,2.44,0h15.11ZM6.27,16.53V7.72h-2.93v8.82h2.93ZM16.84,16.53v-5.06c0-2.71-1.45-3.97-3.37-3.97-1.55,0-2.25.86-2.64,1.46v-1.25h-2.93c.04.83,0,8.82,0,8.82h2.93v-4.92c0-.26.02-.53.1-.72.21-.53.69-1.07,1.5-1.07,1.06,0,1.48.81,1.48,1.99v4.72h2.93ZM4.82,3.47c-1,0-1.66.66-1.66,1.52s.64,1.52,1.62,1.52h.02c1.02,0,1.66-.68,1.66-1.52-.02-.86-.63-1.52-1.64-1.52h0Z"/>
                                                         </svg>
                                                         <a href="/"
                                                            className="Footer_footer__social-list-link">LinkedIn</a>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </div>
                                         <h3 className="Footer_footer__social-copyright">© {new Date().getFullYear()} Sirius
                                             Talent</h3>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </footer>
    )
}

export default Footer