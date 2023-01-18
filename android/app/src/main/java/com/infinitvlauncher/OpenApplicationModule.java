package com.infinitvlauncher;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;

import java.util.Collections;
import java.util.List;

public class OpenApplicationModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public OpenApplicationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "OpenApplication";
  }

  @ReactMethod
  private void launch(String packageName, Promise promise) {
      Intent intent = new Intent();
      intent.setPackage(packageName);

      PackageManager pm = this.reactContext.getPackageManager();
      List<ResolveInfo> resolveInfos = pm.queryIntentActivities(intent, 0);
      Collections.sort(resolveInfos, new ResolveInfo.DisplayNameComparator(pm));

      if(resolveInfos.size() > 0) {
          ResolveInfo launchable = resolveInfos.get(0);
          ActivityInfo activity = launchable.activityInfo;
          ComponentName name=new ComponentName(activity.applicationInfo.packageName, activity.name);

          Intent i=new Intent(Intent.ACTION_MAIN);
          i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
          i.setComponent(name);

          try {
            this.reactContext.startActivity(i);
          } catch (Exception e) {
            promise.reject(e);
          }
      } else {
        promise.reject("0", "No info");
      }
  }
}