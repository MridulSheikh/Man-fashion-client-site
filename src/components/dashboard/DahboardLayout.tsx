import AdminRoute from "../../private/route/AbminRoute"
import Nav from "./Nav"

function DahboardLayout({ children }: any) {
    return (
        <AdminRoute>
            <div className=''>
                <div>
                    <Nav>{children}</Nav>
                </div>
            </div>
        </AdminRoute>
    )
}

export default DahboardLayout