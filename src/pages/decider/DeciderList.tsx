import { FC } from 'react'
import { IDecider, IResponseDeciderListLoader } from '../../types/types';
import { useLoaderData } from 'react-router-dom';

export const deciderListLoader = async () => {
  const response = await fetch('/deciders.json');
  const deciders: IDecider[] = await response.json();
  return { deciders: deciders };
}

export const deciderListAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      return null
    }
    case 'DELETE': {
      return null
    }
  }
}

const DeciderList: FC = () => {
  const { deciders } = useLoaderData() as IResponseDeciderListLoader;


  return (
    <div>{deciders.map((map, _) => (
      <div>
        <div>ID: {map.ID}</div>
        <div>Title: {map.Title}</div>
        <div>Description: {map.Description}</div>
        <div>CreatorId: {map.CreatorId}</div>
        <div>Maps: {map.Maps}</div>
        <div>CreatedAt: {map.CreatedAt}</div>
        <br />
      </div>
    ))}</div>
  )
}

export default DeciderList