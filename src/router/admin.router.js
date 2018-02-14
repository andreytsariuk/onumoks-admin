import Users from '../components/admin/Users';
import Subjects from '../components/admin/Subjects';
import Books from '../components/admin/Books';
import Specialties from '../components/admin/Specialties';
import Cources from '../components/admin/Cources';
import Students from '../components/admin/Students';

export const AdminRoutes = [

    //-----------------------Users----------------
    {

        path: 'users',
        component: Users.List
    },
    {

        path: 'users/:id',
        component: Users.Info
    },

    //----------------------Students-----------------
    {

        path: 'students',
        component: Students.List
    },
    {

        path: 'students/create',
        component: Students.Create
    },
    {

        path: 'students/:id',
        component: Students.Info
    },
    //--------------------Subjects------------------
    {

        path: 'subjects',
        component: Subjects.List

    },
    {
        path: 'subjects/create',
        component: Subjects.Create
    },
    {

        path: 'subjects/:id',
        component: Subjects.Info
    },

    //--------------------Books---------------------

    {

        path: 'books',
        component: Books.List

    },
    {
        path: 'books/create',
        component: Books.Create
    },
    {

        path: 'books/:id',
        component: Books.Info
    },

    //--------------------Specialties---------------------
    {

        path: 'specialties',
        component: Specialties.List

    },
    {
        path: 'specialties/create',
        component: Specialties.Create
    },
    {

        path: 'specialties/:id',
        component: Specialties.Info
    },
    //-------------------Cources-------------------------------
    {

        path: 'courses',
        component: Cources.List

    },
    {
        path: 'courses/create',
        component: Cources.Create
    },
    {
        path: 'courses/:id',
        component: Cources.Info
    }

]