import { FC } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseDeciderLoader } from "../types/types"

const DeciderForm: FC = () => {
    const { maps } = useLoaderData() as IResponseDeciderLoader;

    return (
        <div>
            <Form method="post" action="/decider">
                <label htmlFor="title">
                    <span>Название</span>
                    <input type="text" placeholder="Title.." name="title" />
                </label>
                <label htmlFor="description">
                    <span>Описание</span>
                    <input type="text" placeholder="Description.." name="description" />
                </label>
                {maps.length ? (
                    <div>
                        <span>Карты</span>
                        {maps.map((map, idx) => (
                            <label key={idx}>
                                <input
                                    type="checkbox"
                                    value={map.name}
                                    name="maps"
                                />
                                {map.name}
                            </label>
                        ))}
                    </div>
                ) : (
                    <h1>Отсутствуют карты в списке</h1>
                )}
                <button>Submit</button>
            </Form>
        </div>
    );
};

export default DeciderForm;