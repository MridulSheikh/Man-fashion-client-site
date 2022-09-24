import AdminRoute from "../../private/route/AbminRoute"
import Nav from "./Nav"

function DahboardLayout({ children }: any) {
    return (
        <AdminRoute>
            <div className='container mx-auto'>
                <div>
                    <Nav />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </AdminRoute>
    )
}

export default DahboardLayout