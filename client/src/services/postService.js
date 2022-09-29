import CONSTANTS from "../constants";
import BaseServiceClass from "./baseServiceClass";

class PostService extends BaseServiceClass {
    addNewPost(payload) {
        this.postMethod(payload, CONSTANTS.POSTED, 'posts')
    }

    deleteThePost(post_id) {
        this.deleteMethod(`posts/${post_id}`)
    }

    editThePost(payload, post_id) {
        this.putMethod(payload, CONSTANTS.EDITED, `posts/${post_id}`)
    }

    dislikeThePost(payload, post_id) {
        this.putMethod(payload, CONSTANTS.DISLIKED, `post/lod/${post_id}`)
    }

    likeThePost(payload, post_id) {
        this.putMethod(payload, CONSTANTS.LIKED, `post/lod/${post_id}`)
    }

    publishThePost(post_id) {
        const payload = {
            id: post_id
        }
        this.putMethod(payload, CONSTANTS.PUBLISHED_SUCCESSFULLY, `post/${post_id}/publish`)
    }

    unpublishThePost(post_id) {
        const payload = {
            id: post_id
        }
        this.putMethod(payload, CONSTANTS.UNPUBLISHED_SUCCESSFULLY, `post/${post_id}/unpublish`)
    }
}

export default PostService