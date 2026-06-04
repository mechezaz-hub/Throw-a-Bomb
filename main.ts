info.onCountdownEnd(function () {
    game.gameOver(true)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.setGameOverPlayable(false, music.melodyPlayable(music.powerDown), false)
    game.gameOver(false)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Firework`, mySprite, 50, -15)
    projectile.startEffect(effects.fire)
    projectile.setImage(assets.image`One- Fourth Explosion`)
    pause(100)
    projectile.setImage(assets.image`One- Half Explosion`)
    pause(100)
    projectile.setImage(assets.image`6th Explosion`)
    pause(100)
    projectile.setImage(assets.image`99th Explosion`)
    pause(100)
    projectile.setImage(assets.image`BOOM`)
    pause(100)
    projectile.setImage(assets.image`Ash`)
    pause(100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.spray, 1000)
    info.changeScoreBy(30)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(10, 5000)
    info.changeLifeBy(-1)
    statusbar.value += -0.1
})
let Baddie: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.splash("Press Space To Spawn Bullets.", "Don't Get Caught!")
info.startCountdown(180)
info.changeCountdownBy(-1)
info.setLife(9800)
mySprite = sprites.create(assets.image`Attack`, SpriteKind.Player)
controller.moveSprite(mySprite)
statusbar = statusbars.create(240, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.setStatusBarFlag(StatusBarFlag.LabelAtEnd, true)
game.onUpdateInterval(1000, function () {
    Baddie = sprites.create(assets.image`Enemy`, SpriteKind.Enemy)
    scaling.scaleToPixels(Baddie, randint(1, 120), ScaleDirection.Uniformly, ScaleAnchor.Middle, true)
    Baddie.setVelocity(randint(-20, 20), randint(12 % 2, 90))
})
