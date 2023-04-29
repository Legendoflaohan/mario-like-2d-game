function collision({ object1, object2 }) {
  return (
    object1.anchorPoint.y + object1.height >= object2.anchorPoint.y &&
    object1.anchorPoint.y <= object2.anchorPoint.y + object2.height &&
    object1.anchorPoint.x <= object2.anchorPoint.x + object2.width &&
    object1.anchorPoint.x + object1.width >= object2.anchorPoint.x
  );
}
