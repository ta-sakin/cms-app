## Complaints Classification and Management System.

<hr>

This project is mainly build for the citizens of the Chittagong city corporation. We have a created **client** side where citizen can submit, update complaints and check their complaints status. An **admin** side with a dashboard for each of the 41 wards' councillor to manage and assign complaints.

<b>Cient</b> - [Demo](https://cms-app-9ed7b.web.app)

- OTP verification for signin/signup.
- Submit complain with image private/public/anonymously
- Automatic categorization of a complain using Logistics Regression classifier.
- A newsfeed with infinite scroll and granular filter to see all complaints made by others.
  ![home](https://user-images.githubusercontent.com/47474230/217614139-0064c57e-413a-4a50-98e1-ed5e29cc5457.PNG)
- Upvote/downvote and comment option.
- Check realtime complain status.
  ![my complaint](https://user-images.githubusercontent.com/47474230/217614470-7a803e6c-a62e-4f27-a776-1788706b981b.PNG)
- Profile page with dashboard.

<b>Admin</b> - [Demo](https://ccc-admin.netlify.app)

- Authorized signup process. (For credentials please mail me [here]([tahjib.alsakin@gmail.com]))
- Distinct dashboard based on ward(there are 41 wards)
- Summary of all complaints by their status, category and type.
- Filtered table with all the complaints and users.
- Option to block user from submitting complaint.
- Change complaint status and assign complaint to a officer. ![Complaint assignment process ](https://user-images.githubusercontent.com/47474230/217606148-11298be2-85e2-4306-ae05-d8245da4bdd5.png)
- Change history of a complain.
- Generate pdf after complaint assignment.

<b>Server</b>- A shared nodejs server for <b>client</b> and <b>admin</b>.

### Tech and tools used

React, tailwindcss, daisyui, react query, react-pdf, firebase, nodejs, cloudinary, naturaljs, express, jwt, mongodb,
