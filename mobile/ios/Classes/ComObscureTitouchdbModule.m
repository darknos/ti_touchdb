/**
 * $Id$
 * 
 * Copyright (c) 2012 Paul Mietz Egli
 * Licensed under the Apache Public License version 2.
 *
 * Appcelerator Titanium is Copyright (c) 2009-2010 by Appcelerator, Inc.
 * and licensed under the Apache Public License (version 2)
 */

#import "ComObscureTitouchdbModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"
#import "TiProxy+Errors.h"
#import "TDDatabaseManagerProxy.h"
#import "TDAuthenticatorProxy.h"

extern BOOL EnableLog(BOOL enable);

@interface ComObscureTitouchdbModule ()
@property (nonatomic, strong) TDDatabaseManagerProxy * databaseManagerProxy;
@end

@implementation ComObscureTitouchdbModule

#pragma mark Internal

-(id)moduleGUID {
	return @"d9e122ec-cc6c-4987-85df-0a90523e738c";
}

-(NSString*)moduleId {
	return @"com.obscure.titouchdb";
}

#pragma mark Lifecycle

-(void)startup {
	[super startup];
    
    [CBLManager enableLogging:nil];

	NSLog(@"[INFO] TiTouchDB | Couchbase Mobile version %@", CBLVersion());
    
    if (__has_feature(objc_arc)) {
        NSLog(@"[INFO] ARC is enabled");
    }
    
    if (getenv("NSZombieEnabled") || getenv("NSAutoreleaseFreedObjectCheckEnabled")) {
		NSLog(@"[INFO] NSZombieEnabled/NSAutoreleaseFreedObjectCheckEnabled enabled!");
	}
}

-(void)shutdown:(id)sender {
	[super shutdown:sender];
}

#pragma mark Cleanup 

-(void)dealloc {
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	// optionally release any resources that can be dynamically
	// reloaded once memory is available - such as caches
	[super didReceiveMemoryWarning:notification];
}

#pragma mark Listener Notifications

#pragma mark CBLDatabaseManager

- (id)databaseManager {
    if (!self.databaseManagerProxy) {
        self.databaseManagerProxy = [TDDatabaseManagerProxy proxyWithModule:self];
    }
    return self.databaseManagerProxy;
}

- (void)enableLogging:(id)args {
    NSString * category;
    ENSURE_ARG_AT_INDEX(category, args, 0, NSString)
    
    [CBLManager enableLogging:category];
}

#pragma mark -
#pragma mark CBLAuthenticator

- (id)createBasicAuthenticator:(id)args {
    NSString * user;
    NSString * pass;
    ENSURE_ARG_AT_INDEX(user, args, 0, NSString)
    ENSURE_ARG_AT_INDEX(pass, args, 1, NSString)
    
    return [TDAuthenticatorProxy proxyWithAuthenticator:[CBLAuthenticator basicAuthenticatorWithName:user password:pass]];
}

- (id)createFacebookAuthenticator:(id)args {
    NSString * token;
    ENSURE_ARG_AT_INDEX(token, args, 0, NSString)
    
    return [TDAuthenticatorProxy proxyWithAuthenticator:[CBLAuthenticator facebookAuthenticatorWithToken:token]];
}

- (id)createPersonaAuthenticator:(id)args {
    NSString * assertion;
    ENSURE_ARG_AT_INDEX(assertion, args, 0, NSString)
    
    return [TDAuthenticatorProxy proxyWithAuthenticator:[CBLAuthenticator personaAuthenticatorWithAssertion:assertion]];
}


#pragma mark -
#pragma mark Constants

MAKE_SYSTEM_PROP(REPLICATION_MODE_STOPPED, kCBLReplicationStopped)
MAKE_SYSTEM_PROP(REPLICATION_MODE_OFFLINE, kCBLReplicationOffline)
MAKE_SYSTEM_PROP(REPLICATION_MODE_IDLE, kCBLReplicationIdle)
MAKE_SYSTEM_PROP(REPLICATION_MODE_ACTIVE, kCBLReplicationActive)

MAKE_SYSTEM_PROP(QUERY_ALL_DOCS, kCBLAllDocs)
MAKE_SYSTEM_PROP(QUERY_INCLUDE_DELETED, kCBLIncludeDeleted)
MAKE_SYSTEM_PROP(QUERY_SHOW_CONFLICTS, kCBLShowConflicts)
MAKE_SYSTEM_PROP(QUERY_ONLY_CONFLICTS, kCBLOnlyConflicts)

MAKE_SYSTEM_PROP(QUERY_UPDATE_INDEX_BEFORE, kCBLUpdateIndexBefore)
MAKE_SYSTEM_PROP(QUERY_UPDATE_INDEX_NEVER, kCBLUpdateIndexNever)
MAKE_SYSTEM_PROP(QUERY_UPDATE_INDEX_AFTER, kCBLUpdateIndexAfter)

@end
