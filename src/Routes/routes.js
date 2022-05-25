import ProductsPage from "../Views/ProductsPage";
import TrackedProductsPage from "../Views/TrackedProductsPage";
import MailPage from "../Views/MailPage";

export const routes = [
    { path : '' , component : ProductsPage },
    { path : '/trackedproducts', component : TrackedProductsPage },
    { path : '/mail', component : MailPage }
]