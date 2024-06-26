import { gql } from '@apollo/client';
import * as compose from 'lodash.flowright';
import { Alert, confirm, withProps } from '@erxes/ui/src/utils';
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import List from '../../components/category/List';
import { mutations, queries } from '../../graphql';
import {
  JobCategoriesCountQueryResponse,
  JobCategoriesQueryResponse,
  JobCategoriesRemoveMutationResponse
} from '../../types';
type Props = { queryParams: any };

type FinalProps = {
  jobCategoriesCountQuery: JobCategoriesCountQueryResponse;
  jobCategoriesQuery: JobCategoriesQueryResponse;
} & Props &
  JobCategoriesRemoveMutationResponse;
class ProductListContainer extends React.Component<FinalProps> {
  render() {
    const {
      jobCategoriesCountQuery,
      jobCategoriesQuery,
      jobCategoriesRemove
    } = this.props;

    const remove = jobId => {
      confirm().then(() => {
        jobCategoriesRemove({
          variables: { _id: jobId }
        })
          .then(() => {
            jobCategoriesQuery.refetch();
            jobCategoriesCountQuery.refetch();
            Alert.success(`You successfully deleted a job & service category`);
          })
          .catch(error => {
            Alert.error(error.message);
          });
      });
    };

    const jobCategories = jobCategoriesQuery.jobCategories || [];

    const updatedProps = {
      ...this.props,
      remove,
      jobCategories,
      loading: jobCategoriesQuery.loading,
      jobCategoriesCount: jobCategoriesCountQuery.jobCategoriesTotalCount || 0
    };

    return <List {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['jobCategories', 'jobCategoriesTotalCount', 'products'];
};

const options = () => ({
  refetchQueries: getRefetchQueries()
});

export default withProps<Props>(
  compose(
    graphql<Props, JobCategoriesQueryResponse>(gql(queries.jobCategories), {
      name: 'jobCategoriesQuery',
      options: ({ queryParams }) => ({
        variables: {
          status: queryParams.status,
          parentId: queryParams.parentId,
          searchValue: queryParams.searchValue
        },
        refetchQueries: getRefetchQueries(),
        fetchPolicy: 'network-only'
      })
    }),
    graphql<Props, JobCategoriesCountQueryResponse>(
      gql(queries.jobCategoriesTotalCount),
      {
        name: 'jobCategoriesCountQuery'
      }
    ),
    graphql<Props, JobCategoriesRemoveMutationResponse, { _id: string }>(
      gql(mutations.jobCategoriesRemove),
      {
        name: 'jobCategoriesRemove',
        options
      }
    )
  )(ProductListContainer)
);
