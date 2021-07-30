import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import EmptyState from 'modules/common/components/EmptyState';
import Spinner from 'modules/common/components/Spinner';
import { withProps, Alert } from 'modules/common/utils';
import React from 'react';
import { graphql } from 'react-apollo';
import { IUser } from '../../../auth/types';
import AutomationForm from '../../components/forms/AutomationForm';
import { queries, mutations } from '../../graphql';
import {
  DetailQueryResponse,
  EditMutationResponse,
  IAutomation
} from '../../types';

type Props = {
  id: string;
};

type FinalProps = {
  automationDetailQuery: DetailQueryResponse;
  currentUser: IUser;
} & Props &
  EditMutationResponse;

const AutomationDetailsContainer = (props: FinalProps) => {
  const { automationDetailQuery, currentUser, editAutomationMutation } = props;

  const save = (doc: IAutomation) => {
    editAutomationMutation({
      variables: {
        ...doc
      }
    })
      .then(() => {
        Alert.success(`You successfully updated a ${doc.name}`);
      })

      .catch(error => {
        Alert.error(error.message);
      });
  };

  // const renderButton = ({
  //   name,
  //   values,
  //   isSubmitted,
  //   callback,
  // }: IButtonMutateProps) => {
  //   return (
  //     <ButtonMutate
  //       mutation={mutations.automationsEdit}
  //       variables={values}
  //       callback={callback}
  //       refetchQueries={["automations", "automationsMain", "automationDetail"]}
  //       isSubmitted={isSubmitted}
  //       type="submit"
  //       successMessage={`You successfully updated a ${name}`}
  //     />
  //   );
  // };

  if (automationDetailQuery.loading) {
    return <Spinner objective={true} />;
  }

  if (!automationDetailQuery.automationDetail) {
    return (
      <EmptyState text="Automation not found" image="/images/actions/24.svg" />
    );
  }

  const automationDetail = automationDetailQuery.automationDetail || {};

  const updatedProps = {
    ...props,
    loading: automationDetailQuery.loading,
    automation: automationDetail,
    currentUser,
    save
  };

  return <AutomationForm {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, DetailQueryResponse, { _id: string }>(
      gql(queries.automationDetail),
      {
        name: 'automationDetailQuery',
        options: ({ id }) => ({
          variables: {
            _id: id
          }
        })
      }
    ),
    graphql<{}, EditMutationResponse, IAutomation>(
      gql(mutations.automationsEdit),
      {
        name: 'editAutomationMutation'
      }
    )
  )(AutomationDetailsContainer)
);