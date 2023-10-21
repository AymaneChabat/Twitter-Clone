import { useDispatch, useSelector } from "react-redux";
import DisplayPost from "./displaypost";
import { getPost } from "../../redux/actions/postActions";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingIcon from "../icons/loading";

export default function DisplayPosts({tab, user}) {
    const posts = useSelector((state) => state.posts);
    const currUser = useSelector(state => state.currUser)
    const [loading, setLoading] = useState(false)
    const [scrollPos, setScrollPos] = useState(0);
    const prevScroll = useRef(0)

    const dispatch = useDispatch()

    const postsFound = () => {
        if (tab !== "home" && tab !== "following") {
            return posts[tab].find((posts) => posts.user === user.id) ? posts[tab].find((posts) => posts.user === user.id).posts : undefined
        } else {
            return posts[tab]
        }
    }

    const postsVariants = {
        hidden: {
            height: 0,
            opacity: 0
        },
        visible: {
            height: "auto",
            opacity: 1,
            transition: {
                duration: 1
            }
        }
    }

    
    
    useEffect(()=>{
        const e = document.getElementById(tab !== "home" && tab !== "following" ? "profile" : "home");
        e.addEventListener("scroll", (e) => {
            setScrollPos(e.currentTarget.scrollTop)
        })
    }, [])

    const last = () => {
        const userPosts = posts[tab].find((posts) => posts.user === user.id)
        if (tab !== "replies" && tab !== "likes") {
            if (postsFound()) {
                return userPosts.posts[userPosts.posts.length - 1]
            }
        } else {
            if (postsFound()) {
                return userPosts.posts.length
            } else {
                return 0
            }
        }
    }

    const getPostTemp = (last, username) => {
        dispatch(getPost(undefined, tab, last, username, currUser.token, setLoading))
    }

    useEffect(() => {
        const element = document.getElementById(tab !== "home" && tab !== "following" ? "profile" : "home");
        if (loading === false) {
            if (tab === "home" || tab === "following") {
                if (postsFound().length === 0) {
                    getPostTemp(undefined, undefined)
                } else if (prevScroll.current < scrollPos && scrollPos + element.clientHeight > element.scrollHeight - 500) {
                    getPostTemp(posts[tab][posts[tab].length - 1], undefined)
                }
            } else {
                if (postsFound() === undefined) {
                    getPostTemp(last(), user.info.username)
                } else if (prevScroll.current < scrollPos && scrollPos + element.clientHeight > element.scrollHeight - 500) {
                    setLoading(true)
                    getPostTemp(last(), user.info.username)
                }
            }
        }

        prevScroll.current = scrollPos;
    }, [scrollPos, tab]);
    
    return (
        <AnimatePresence initial={false}>
            {postsFound() && postsFound().map((post, index)=>(
                <motion.div
                variants={postsVariants}
                key={post}
                initial="hidden"
                animate="visible"
                exit="hidden"
                >
                    { tab !== "replies" 
                    ? 
                    <DisplayPost postPath={post} /> : 
                    <>
                        <DisplayPost
                        postPath={post.mainPost}
                        key={post + "1"}
                        main={true}
                        />
                        <DisplayPost
                        postPath={post.replyPost}
                        key={post + "2"}
                        reply={true}
                        />
                    </>}
                </motion.div>
            ))}
            {loading && <LoadingIcon />}
        </AnimatePresence>
    )
}