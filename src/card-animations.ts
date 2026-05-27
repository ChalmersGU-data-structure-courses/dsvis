/**
 * Card animations - loaded on the index page
 * Initializes looping algorithm visualizations in the landing page cards
 */

import { AVLCardAnimation } from "~/card-animations/AVLCardAnimation";
import { BinaryHeapCardAnimation } from "~/card-animations/BinaryHeapCardAnimation";
import { BubbleSortCardAnimation } from "~/card-animations/BubbleSortCardAnimation";
import { DFSCardAnimation } from "~/card-animations/DFSCardAnimation";

// Initialize card animations on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // AVL tree animation on the collections card
    const avlContainer = document.getElementById("avl-card-animation");
    if (avlContainer) {
        new AVLCardAnimation("avl-card-animation");
    }

    // Binary heap animation on the priority queues card
    const heapContainer = document.getElementById("heap-card-animation");
    if (heapContainer) {
        new BinaryHeapCardAnimation("heap-card-animation");
    }

    // Bubble sort animation on the sorting card
    const bubbleContainer = document.getElementById("bubble-card-animation");
    if (bubbleContainer) {
        new BubbleSortCardAnimation("bubble-card-animation");
    }

    // DFS animation on the graph card
    const dfsContainer = document.getElementById("dfs-card-animation");
    if (dfsContainer) {
        new DFSCardAnimation("dfs-card-animation");
    }
});
