#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

/* Add the library import at the top of AppDelegate.m */
#import "RCTAppleHealthKit.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Create a bridge instance
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                            launchOptions:launchOptions];
  
  self.moduleName = @"rehat_ios";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Add background initializer for HealthKit
  [[RCTAppleHealthKit new] initializeBackgroundObservers:bridge];
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
