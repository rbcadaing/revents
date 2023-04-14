import React from "react";
import { Container, Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import { useParams } from "react-router-dom";
import { listenToSelectedUSerProfile } from "../profileActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(id),
    data: (profile) => dispatch(listenToSelectedUSerProfile(profile)),
    deps: [dispatch, id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content="Loading Profile..." />;

  return (
    <Container className="main">
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader
            profile={selectedUserProfile}
            isCurrentUSer={currentUser.uid === selectedUserProfile.id}
          />
          <ProfileContent
            profile={selectedUserProfile}
            isCurrentUSer={currentUser.uid === selectedUserProfile.id}
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
