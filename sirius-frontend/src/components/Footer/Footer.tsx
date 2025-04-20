import React, {useContext} from "react";
import "./Footer.css";
import "C:/Users/traxler/training/sirius/src/App.css";
import {columnsStyle} from "../../shared/columnsStyle.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import LoadingContext from "../../context/LoadingContext.tsx";
import footerCategoryList from "../../dummy-data/FooterItemDummyData.tsx";
import {FacebookSvg} from "../../assets/FacebookSvg.tsx";
import {InstagramSvg} from "../../assets/InstagramSvg.tsx";

const Footer:React.FC = () => {
    const { loading } = useContext(LoadingContext);

    if (loading) return null;


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
                             {footerCategoryList.map((category, index) => {
                                 const style = columnsStyle(
                                     1, 10,         // sm
                                     1, 10,         // md
                                     2 + 4 * index, 5 + 4 * index,   // lg
                                     1 + 3 * index, 4 + 3 * index    // xl
                                 );

                                 return (
                                     <div key={category.categoryTitle} className="Grid_grid__item" style={style}>
                                         <div className="Footer_footer__link-list">
                                             <div className="Footer_footer__list-header">
                                                 <h3 className="Footer_footer__title">{category.categoryTitle}</h3>
                                             </div>
                                             <div className="Footer_footer__list-body">
                                                 <ul>
                                                     {category.categoryItemList.map((item) => (
                                                         <li key={item.href} className={"Footer__list-item"}>
                                                             <a href={item.href} className="Footer__list-link">
                                                                 {item.name}
                                                             </a>
                                                         </li>
                                                     ))}
                                                 </ul>
                                             </div>
                                         </div>
                                     </div>
                                 );
                             })}
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
                                                         <FacebookSvg/>
                                                         <a href="https://www.facebook.com/share/1EJmiHFdvL/?mibextid=wwXIfr
"
                                                            className="Footer_footer__social-list-link">Facebook</a>
                                                     </li>
                                                     <li className="Footer_footer__list-item-social Footer_footer__list-item">
                                                         <InstagramSvg/>
                                                         <a href="https://www.instagram.com/sirius_talent_agency?igsh=MWJyN3BjNzZpM2F2Ng=="
                                                            className="Footer_footer__social-list-link">Instagram</a>
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