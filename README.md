#  APLICACÍON WEB KIWEAR
This application simulates a web store about clothes, being able to be a simile of the famous pages of Zalando, SVD (SiVasDescalzo) or Shein among others.
    <h2>Visual result of the treated sections</h2>
    <h4>HOMEPAGE</h4>
    <img src="https://user-images.githubusercontent.com/75810680/109743968-d52fe800-7bd1-11eb-91c9-5ed91c7e3bc9.png" width="1000px" >
    <h4>CATEGORIES</h4>
    <img src="https://user-images.githubusercontent.com/75810680/109744397-82a2fb80-7bd2-11eb-94d2-c315fae91081.png" width="1000px">
    <h4>SHOP VIEWS</h4>
    <img src="https://user-images.githubusercontent.com/75810680/121375082-bcf20680-c940-11eb-8d78-ffd455f8a5db.png" width="1000px">
    <h4>FILTERS</h4>
    <img src="https://user-images.githubusercontent.com/75810680/109744802-2f7d7880-7bd3-11eb-9384-60319b491770.png" width="1000px" height="800">
    <h4>PAGINATION</h4>
    <img src="https://user-images.githubusercontent.com/75810680/121375562-1d814380-c941-11eb-9b5e-f44a0e020663.png" width="1000px">
    <h4>DETAILS</h4>
    <img src="https://user-images.githubusercontent.com/75810680/109745101-a61a7600-7bd3-11eb-9dbe-42ab4e09e63a.png" width="1000px">
    <h4>API REST</h4>
    <img src="https://user-images.githubusercontent.com/75810680/109745266-e4b03080-7bd3-11eb-911a-d1b563784dab.png" width="1000px">
    <h4>REGISTER</h4>
    <img src="https://user-images.githubusercontent.com/75810680/121388198-91c0e480-c94b-11eb-947a-dc096f61b046.png" width="1000px">
    <h4>LOGIN</h4>
    <img src="https://user-images.githubusercontent.com/75810680/121388075-72c25280-c94b-11eb-83c6-65d13172bdf1.png" width="1000px">
    <h4>RECOVER</h4>
    <img src="https://user-images.githubusercontent.com/75810680/121388393-c03ebf80-c94b-11eb-9bfc-b783f63dced2.png" width="1000px">
        <h2>Explain th treated sections</h2>
    <table>
      <thead>
          <tr>
              <th>Title</th>
              <th>Description</th>
          </tr>
        </thead>  
        <tbody>
            <tr>
                <th>Homepage</th>
                <td>On the main page of the web application we will find a slider which will offer us information about the page and also will show us some of the categories of the items that are sold</td>
            </tr>
            <tr>
                <th>Categories</th>
                <td>In the categories section we will find the great variety of dynamically painted categories and with any change in the database, it will be dynamically updated in the web application. Also as we scroll, we will see more categories available.</td>
            </tr>
            <tr>
                <th>Shop Views</th>
                <td>In the main view of the shop, we will find a search bar (as in the main page) where we can search for our desired items. All these items will also be dynamically painted.</td>
            </tr>
            <tr>
                <th>Filters</th>
                <td>In the filters section we find a form that will collect the information of the filters that the user wants and when applying them, the articles will be dynamically displayed. If we instead select the option 'ALL', the filters will be deleted and all the articles in that category will be shown again.</td>
            </tr>
            <tr>
                <th>Pagination</th>
                <td>Regarding paging, we have used the BOOTPAG extension to be able to do it. The pages will be automatically calculated with respect to the number of products knowing that each of them shows 5 products. We will also calculate the OFFSET which is the row for which we want to start counting to show that information</td>
            </tr>
            <tr>
                <th>Details</th>
                <td>In the details, we will dynamically display the specific information for each product in addition to the products that may interest us.</td>
            </tr>
            <tr>
                <th>Api Rest</th>
                <td>Finally, in the REST API section, we have consumed the information from an external API which will show us information from the books related to the category we are in.</td>
            </tr>
            <tr>
                <th>Login</th>
                <td>In order to access the account we will need to have an account on our website. You can log in with the email and password with which you have registered or you can also log in with a Google account or with a GitHub account. We can do this thanks to the external application firebase.</td>
            </tr>
            <tr>
                <th>Register</th>
                <td>If we want to buy items on the page, we will need to have an account where we will associate each product with the user. For this, customers must register on the website. Once they have filled out the form, a confirmation email will be sent to them. We can send this email thanks to the external application mailgun.</td>
            </tr> 
            <tr>
                <th>Recover</th>
                <td>In the event that we want to log in and we do not remember our password, we will have the option of recovering it from the user's email, which will receive an email where a link will be passed to him that when clicking, will show him a form to establish the new one. password.</td>
            </tr>              
        </tbody>
    </table>
    <h4>Built with:</h4>
    <ul>
        <li><a href="https://www.javascript.com/">JAVASCRIPT</a></li>
        <li><a href="https://angularjs.org/">ANGULARJS</a></li>
        <li><a href="https://www.php.net/">PHP</a></li>
        <li><a href="https://www.mysql.com/">MYSQLI</a></li>
        <li><a href="https://developer.mozilla.org/es/docs/Web/HTML">HTML<a/></li>
        <li><a href="https://developer.mozilla.org/es/docs/Web/CSS">CSS</a></li>
    </ul>
    <h4>Other technologies and extensions</h4>
    <ul>
        <li><a href="https://getbootstrap.com/">Extension BOOTSTRAP</a></li>
        <li><a href="https://muuri.dev/">Extension MUURII for animation</a></li>
        <li><a href="https://www.mysql.com/products/workbench/">MYSQLI WORCKBENCH</a></li>
    </ul>
    <h4>Api Rest</h4>
    <ul>
        <li><a href="https://www.mailgun.com/">Mailgun</a></li>
        <li><a href="https://firebase.google.com/?hl=es">Firebase</a></li>
    </ul>