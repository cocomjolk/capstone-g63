<!-- DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW  -->
<!-- DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW  -->
<!-- DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW  -->
<!-- DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW  -->
<!-- DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW DOCTOR VIEW  -->


<!-- NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR  -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav-main">
    <a class="navbar-brand" ui-sref='login'>Recovery Plus</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" ui-sref='login'>Home </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ui-sref=''>Edit Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ui-sref='login'>Log Out</a>
        </li>
      </ul>
    </div>
</nav>

<!-- **************************************************************************************** -->


<!-- USER CONTENT USER CONTENT USER CONTENT USER CONTENT USER CONTENT USER CONTENT USER CONTENT USER CONTENT USER CONTENT USER CONTENT  -->
    <div class="row">
      <div id="userContent">

          <!-- RECENT ACTIVITY  -->
          <div class="rewards" ng-show='$ctrl.showForm'>
            <h3 class="display-4 text-white">Patients</h3>
            <div ng-repeat='patient in $ctrl.patients' class="row" ng-show='true'>
              <div class="card" style="width: 18rem;">
                <div class="patientList">
                    <h5 class="card-header text-black bg-secondary mb-3">{{patient.first_name}} {{patient.last_name}}</h5>
                    <img class="card-img-top" src="{{patient.img}}" alt="Card image cap">
                    <div class="card-body">
                      <h6 class="card-text">Points: {{patient.points}} Videos: 0</h6>
                      <p class="card-text">need to add a comment section in the db.</p>
                      <a  ng-click="" class="btn btn-primary btn-block">{{reward.reward_points}} See videos</a>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <!-- LIST OF REWARDS FROM DOCTOR -->
          <div class="rewards" ng-show='!$ctrl.showForm'>
            <h3 class="display-4 text-white">Rewards</h3>
            <button ng-click="$ctrl.addRewardForm = !$ctrl.addRewardForm " type="button" class="btn btn-outline-light btn-sm">+ add Reward</button>

            <!-- NG REPEAT LIST -->
            <div ng-repeat='reward in $ctrl.rewards' class="row">
              <div class="card" style="width: 18rem;">
                <div class="patientList">
                    <h5 class="card-header ttext-black bg-secondary mb-3">{{reward.reward_name}}</h5>
                    <img class="card-img-top" src="{{reward.img}}" alt="Card image cap">
                    <div class="card-body">
                        <h6 class="card-text">Reward Points: {{reward.reward_points}}</h6>
                        <p class="card-text">Description{{reward.reward_comment}}</p>
                        <a  ng-click="redeemReward" class="btn btn-outline-primary btn-sm">Redeem</a>
                    </div>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
</div>


<!-- ********************************************************************************* -->
