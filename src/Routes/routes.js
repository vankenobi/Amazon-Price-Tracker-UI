import ProductsPage from "../Views/ProductsPage";
import TrackedProductsPage from "../Views/TrackedProductsPage";
import MailPage from "../Views/MailPage";
import TrackedProductPage from "../Views/TrackedProductPage";

export const routes = [
    { path : '' , component : ProductsPage },
    { path : '/trackedproducts', component : TrackedProductsPage },
    { path : '/mail', component : MailPage },
    { path : '/trackedproducts/trackedproduct', component : TrackedProductPage}
]