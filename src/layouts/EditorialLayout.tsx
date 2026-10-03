import { Outlet } from 'react-router-dom';
import EditorialNav from '../components/EditorialNav';

export default function EditorialLayout() {
  return (
    <div className="min-h-screen">
      <EditorialNav />
      <main className="pt-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
