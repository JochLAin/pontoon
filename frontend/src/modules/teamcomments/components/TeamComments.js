/* @flow */

import * as React from 'react';
import { Localized } from '@fluent/react';

import './TeamComments.css';

import { CommentsList } from 'core/comments';

import type { NavigationParams } from 'core/navigation';
import type { UserState } from 'core/user';
import type { TeamCommentState } from 'modules/teamcomments';

type Props = {|
    parameters: NavigationParams,
    teamComments: TeamCommentState,
    user: UserState,
    contactPerson: string,
    addComment: (string, ?number) => void,
    togglePinnedStatus: (boolean, number) => void,
    resetContactPerson: () => void,
|};

export default function TeamComments(
    props: Props,
): null | React.Element<'section'> {
    const {
        teamComments,
        user,
        parameters,
        addComment,
        togglePinnedStatus,
        contactPerson,
        resetContactPerson,
    } = props;

    if (teamComments.fetching || !teamComments.comments) {
        return null;
    }

    const comments = teamComments.comments;

    let canComment = user.isAuthenticated;
    const canPin = user.isAdmin;

    return (
        <section className='team-comments'>
            {!comments.length && !canComment ? (
                <Localized id='entitydetails-Helpers--no-comments'>
                    <p className='no-team-comments'>No comments available.</p>
                </Localized>
            ) : (
                <CommentsList
                    comments={comments}
                    parameters={parameters}
                    user={user}
                    canComment={canComment}
                    canPin={canPin}
                    addComment={addComment}
                    togglePinnedStatus={togglePinnedStatus}
                    contactPerson={contactPerson}
                    resetContactPerson={resetContactPerson}
                />
            )}
        </section>
    );
}
